#! /usr/bin/env node
import packageJson from './package.json';
import { green } from 'picocolors';

const figlet = require('figlet');
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

console.log(
  figlet.textSync('OPub', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  })
);

let projectPath: string = '';
const packageManager = 'yarn';

const program = new Command(packageJson.name);

program
  .version(packageJson.version)
  .description(packageJson.description)
  // .arguments('<project-directory>')
  .usage(`${green('<project-directory>')} [options]`)
  .action((name: string) => {
    projectPath = name;
  })
  .command('init', 'Initialize a new OPub project')
  .option('-l, --ls  [value]', 'List directory contents')
  .parse(process.argv);

const options = program.opts();

async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
      const { size, birthtime } = fileDetails;
      return { filename: file, 'size(KB)': size, created_at: birthtime };
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (error) {
    console.error('Error occurred while reading the directory!', error);
  }
}

if (options.ls) {
  const filepath = typeof options.ls === 'string' ? options.ls : __dirname;
  listDirContents(filepath);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}