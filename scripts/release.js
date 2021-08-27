const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const execa = require('execa');
const semver = require('semver');
const prompts = require('prompts');
const currentVersion = require('../package.json').version;
const packages = require('./packages');

const dryRun = (...args) => Promise.resolve(console.log(chalk.yellow('dry-run'), ...args));
const realRun = (...args) => execa(...args);
const run = process.argv.includes('--dry-run') ? dryRun : realRun;

const spinner = ora();

release().catch((error) => {
  spinner.fail('Failed to release, please read error details below:');
  console.log(chalk.red('  Error:'), error.message);
});

async function release() {
  // ----- Fetch release tag -----
  const branchToTag = {
    master: 'latest',
    alpha: 'alpha',
    beta: 'beta',
  };

  const branch = await realRun('git', ['branch', '--show-current']).then((result) => result.stdout);
  const releaseTag = branchToTag[branch];
  if (!releaseTag) throw new Error('Can only be released on master, alpha or beta branch');

  // ----- Ask for release version -----

  const releaseType = (type) => (releaseTag === 'latest' ? type : `pre${type}`);

  const presets = {
    prerelease: semver.inc(currentVersion, 'prerelease', releaseTag),
    patch: semver.inc(currentVersion, releaseType('patch'), releaseTag),
    minor: semver.inc(currentVersion, releaseType('minor'), releaseTag),
    major: semver.inc(currentVersion, releaseType('major'), releaseTag),
  };

  const response = await prompts([
    {
      type: 'select',
      name: 'value',
      message: `Select release type (Current: ${currentVersion}):`,
      choices: [
        releaseTag !== 'latest' && { title: 'prerelease', value: presets.prerelease, description: presets.prerelease },
        { title: releaseType('patch'), value: presets.patch, description: presets.patch },
        { title: releaseType('minor'), value: presets.minor, description: presets.minor },
        { title: releaseType('major'), value: presets.major, description: presets.major },
        { title: 'custom', value: 'custom', description: 'input' },
      ].filter(Boolean),
    },
    {
      type: (prev) => (prev === 'custom' ? 'text' : false),
      name: 'value',
      message: 'Input target version to publish:',
      validate: (value) => !!semver.valid(value) || 'Not a valid version',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (version) => `Confirm to release ${chalk.yellow(`v${semver.valid(version)}`)} with tag ${chalk.yellow(releaseTag)}?`,
    },
  ]);

  const releaseVersion = semver.valid(response.value);
  if (!releaseVersion || !response.confirm) return;

  // ----- Update package versions and dependencies -----

  spinner.start('Updating package versions...\n');

  updateVersion(path.resolve(__dirname, '..'), releaseVersion);
  packages.forEach((pkg) => updateVersion(pkg.path, releaseVersion));

  spinner.succeed('Version updated');

  // ----- Build packages -----

  spinner.start('Building packages...\n');

  await run('yarn', ['workspaces', 'run', 'build']);

  spinner.succeed('packages built');

  // ----- Run tests -----

  spinner.start('Running tests...\n');

  await run('yarn', ['workspaces', 'run', 'test']);

  spinner.succeed('Tests passed');

  // ----- Generate changelog -----

  spinner.start('Generating changelog...\n');

  if (releaseTag === 'latest') {
    await run('yarn', ['run', 'changelog']);
    spinner.succeed('changelog generated');
  } else {
    spinner.info('Skipped to generate changelog');
  }

  const diff = await realRun('git', ['diff']).then((result) => result.stdout);

  if (diff) {
    await run('git', ['add', '-A']);
    await run('git', ['commit', '--no-verify', '-m', `release: v${releaseVersion}`]);
  }

  // ----- Publish packages -----

  await Promise.all(packages.filter((pkg) => !pkg.private).map((pkg) => publishPackage(pkg.path, releaseVersion, releaseTag)));

  // ----- Push to Github -----

  await run('git', ['tag', `v${releaseVersion}`]);
  await run('git', ['push', '--tag']);
  await run('git', ['push']);

  spinner.succeed(`v${releaseVersion} Released`);
}

function updateVersion(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;
  updateDeps(pkg, 'dependencies', version);

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

async function updateDeps(pkg, type, version) {
  const deps = pkg[type];
  if (!deps) return;

  Object.keys(deps).forEach((dep) => {
    if (packages.find((p) => p.name === dep)) {
      console.log(`  ${pkg.name} - ${dep} -> ${version}`);
      deps[dep] = version;
    }
  });
}

async function publishPackage(pkgRoot, version, tag) {
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf-8'));
  if (pkg.private) return;

  spinner.start(`Publishing ${chalk.yellow(`${pkg.name}@${version}`)} on ${chalk.yellow(tag)}\n`);

  await run('yarn', ['publish', '--access', 'public', '--tag', tag], { cwd: pkgRoot });

  spinner.succeed(`Successfully published ${chalk.yellow(`${pkg.name}@${version}`)} on ${chalk.yellow(tag)}`);
}
