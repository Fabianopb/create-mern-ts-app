#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');

(() => {
  console.log(chalk.cyan('creating sample from template...'));
  cp.execSync('yarn create-sample', { stdio: 'inherit' });
  console.log(chalk.cyan('linting and testing...'));
  cp.execSync('yarn lint', { cwd: 'sample-app', stdio: 'inherit' });
  cp.execSync('yarn test', { cwd: 'sample-app', stdio: 'inherit' });
  console.log(chalk.cyan('cleaning sample...'));
  cp.execSync('yarn clean', { stdio: 'inherit' });
})();
