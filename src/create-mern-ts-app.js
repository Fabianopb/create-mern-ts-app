#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const crypto = require('crypto');

function checkNodeVersion() {
  const currentNodeVersion = process.versions.node;
  const currentNodeMajor = parseInt(currentNodeVersion.split('.')[0], 10);
  const requiredNodeMajor = 8;

  if (currentNodeMajor < requiredNodeMajor) {
    console.log(
      chalk.red(
        'You are running Node ' +
          currentNodeVersion +
          '.\n' +
          `Create MERN TS App requires Node ${requiredNodeMajor} or higher.\n` +
          'Please update your version of Node.\n'
      )
    );
    process.exit(1);
  }
  console.log(chalk.green(`Node ${currentNodeVersion} found, you're good to go!\n`));
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

function checkYarnVersion() {
  const minReqYarnVersion = '1.5.0';
  console.log(chalk.cyan('Checking yarn version...'));
  try {
    const yarnVersion = cp.execSync('yarnpkg --version').toString().trim();
    if (semver.gte(yarnVersion, minReqYarnVersion)) {
      console.log(chalk.cyan(`Using yarn ${yarnVersion}\n`));
    } else {
      console.log(chalk.yellow(`We require at least yarn ${minReqYarnVersion} and you are using ${yarnVersion}\n`));
      throw new Error('Yarn not found');
    }
  } catch (e) {
    process.exit(1);
  }
}

function asyncSpawn(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = cp.spawn(command, [...args], { cwd, stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error('Something went wrong...'));
        return;
      }
      resolve();
    });
  });
}

(async() => {
  try {
    checkNodeVersion();
    checkYarnVersion();
    const projectName = checkProjectName();
    createProjectTemplate(projectName);
    generateEnvFile(projectName);
    await asyncSpawn('yarn', ['install'], projectName);
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
  }
})();
