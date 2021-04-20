const exec = require('execa');
const ora = require('ora');
const packages = require('./packages');

const spinner = ora();

bootstrap();

async function bootstrap() {
  spinner.start('Bootstrap start...');

  try {
    for (const pkg of packages) {
      spinner.start(`Installing dependencies for: ${pkg.name}`);
      await exec('npm', ['install'], { cwd: pkg.path });
    }
  } catch (error) {
    spinner.fail(error.message);
    return;
  }

  spinner.succeed('Bootstrap finished');
}
