#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

function useYarn() {
  try {
    cp.execSync('yarnpkg --version', { stdio: 'ignore' });
    console.log(chalk.cyan('Yarn found! You\'re good to go!'));
  } catch (e) {
    console.log(chalk.red('Yarn not found. Please go to https://yarnpkg.com/ install yarn and try again.'));
    process.exit(1);
  }
}

function checkProjectName() {
  const projectName = process.argv[2];
  if (!projectName) {
    console.log(chalk.red('Project name has to be specified. Try for example:'));
    console.log(`  ${chalk.cyan('create-mern-ts-app')} ${chalk.yellow('my-app')}\n`);
    process.exit(1);
  }
  return projectName;
}

function createProjectTemplate(projectName) {
  const srcRoot = path.join(__dirname, '../template/');
  const destRoot = path.resolve(projectName);
  console.log(chalk.cyan('Project will be created at:'));
  console.log(chalk.cyan(destRoot + '\n'));
  fs.mkdirsSync(destRoot);
  fs.copySync(srcRoot, destRoot);
}

function generateEnvFile(projectName) {
  const destRoot = path.resolve(projectName);
  const envContents = fs.readFileSync(path.join(destRoot, 'backend', '.env.example'), 'utf8')
    .replace(/auth-shared-secret/g, crypto.randomBytes(24).toString('hex'));
  fs.writeFileSync(path.join(destRoot, 'backend', '.env'), `# This is an auto-generated file, change at your own will and risk.\n\n${envContents}`);
}

try {
  useYarn();
  const projectName = checkProjectName();
  createProjectTemplate(projectName);
  generateEnvFile(projectName);
  cp.spawn('yarn', ['install'], { cwd: projectName, stdio: 'inherit' });
} catch (e) {
  console.log(chalk.red(e));
  process.exit(1);
}
