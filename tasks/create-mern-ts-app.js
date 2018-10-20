const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const currentMajor = parseInt(currentNodeVersion.split(".")[0], 10);
const requiredMajor = 8;
const projectName = process.argv[2];

if (currentMajor < requiredMajor) {
  console.log(
    chalk.red(
      'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        `Create MERN TS App requires Node ${requiredMajor} or higher.\n` +
        'Please update your version of Node.\n'
    )
  );
  process.exit(1);
}

if (!projectName) {
  console.log(chalk.yellow('Project name has to be specified. Try for example:'));
  console.log(`  ${chalk.cyan('create-mern-ts-app')} ${chalk.green('my-app')}\n`);
  process.exit(1);
}
