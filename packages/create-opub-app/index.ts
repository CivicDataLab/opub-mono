#! /usr/bin/env node
import { createApp } from './create-app';
import packageJson from './package.json';
import { green, cyan, red } from 'picocolors';

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
const example =
  'https://github.com/CivicDataLab/opub-mono/tree/main/examples/district';

const program = new Command(packageJson.name);

program
  .version(packageJson.version)
  .description(packageJson.description)
  .arguments('<project-directory>')
  .usage(`${green('<project-directory>')} [options]`)
  .action((name: string) => {
    projectPath = name;
  })
  .command('init', 'Initialize a new OPub project')
  .parse(process.argv);

const options = program.opts();

// if no arguments are passed, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

async function run(): Promise<void> {
  createApp({
    example,
    projectPath,
  });
}

run().catch(async (reason) => {
  console.log();
  console.log('Aborting installation.');
  if (reason.command) {
    console.log(`  ${cyan(reason.command)} has failed.`);
  } else {
    console.log(
      red('Unexpected error. Please report it as a bug:') + '\n',
      reason
    );
  }
  console.log();
  process.exit(1);
});
