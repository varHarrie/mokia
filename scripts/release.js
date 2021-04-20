const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const execa = require('execa');
const semver = require('semver');
const prompts = require('prompts');
const currentVersion = require('../package.json').version;
const packages = require('./packages');

const spinner = ora();

release().catch((error) => {
  console.log(chalk.red('Error:'), error.message);
  spinner.fail('Failed to release, read error details above');
});

async function release() {
  // ----- Fetch release tag -----
  const branchToTag = {
    master: 'latest',
    alpha: 'alpha',
    beta: 'beta',
  };

  const branch = await execa('git', ['branch', '--show-current']).then((result) => result.stdout);
  const releaseTag = branchToTag[branch];
  if (!releaseTag) throw new Error('Can only be released in master, alpha or beta branch');

  // ----- Ask for release version -----

  const presets = {
    patch: semver.inc(currentVersion, 'patch'),
    minor: semver.inc(currentVersion, 'minor'),
    major: semver.inc(currentVersion, 'major'),
  };

  const response = await prompts([
    {
      type: 'select',
      name: 'value',
      message: `Select release type (Current: ${currentVersion}):`,
      choices: [
        { title: 'patch', value: presets.patch, description: presets.patch },
        { title: 'minor', value: presets.minor, description: presets.minor },
        { title: 'major', value: presets.major, description: presets.major },
        { title: 'custom', value: 'custom', description: 'input' },
      ],
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

  await execa('npm', ['run', 'build', '--workspaces']);

  spinner.succeed('packages built');

  // ----- Run tests -----

  spinner.start('Running tests...\n');

  await execa('npm', ['run', 'test', '--workspaces']);

  spinner.succeed('Tests passed');

  // ----- Generate changelog -----

  spinner.start('Generating changelog...\n');

  await execa('npm', ['run', 'changelog']);

  const diff = await execa('git', ['diff']).then((result) => result.stdout);

  if (diff) {
    await execa('git', ['add', '-A']);
    await execa('git', ['commit', '--no-verify', '-m', `release: v${releaseVersion}`]);
  }

  spinner.succeed('changelog generated');

  // ----- Publish packages -----

  await Promise.all(packages.map((pkg) => publishPackage(pkg.path, releaseVersion, releaseTag)));

  // ----- Push to Github -----

  await execa('git', ['tag', `v${releaseVersion}`]);
  await execa('git', ['push', '--tag']);
  await execa('git', ['push']);

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

  spinner.start(`Publishing ${chalk.yellow(`${pkg.name}@${version}`)} on ${chalk.yellow(tag)}`);

  await execa('npm', ['publish', '--tag', tag], { cwd: pkgRoot });

  spinner.succeed(`Successfully published ${chalk.yellow(`${pkg.name}@${version}`)} on ${chalk.yellow(tag)}`);
}
