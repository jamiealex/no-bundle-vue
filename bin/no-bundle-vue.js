#!/usr/bin/env node
// vim: set filetype=javascript:
 /* eslint-disable */
'use strict';
const program = require('commander');
const path = require('path');
const NoBundleVue = require('../dist/no-bundle-vue.umd');
program
  .version(process.env.npm_package_version || '0.0.0')
  .usage('no-bundle [options]')
  .command('no-bundle', { isDefault: true })
  .requiredOption(
    '-s --sourceDirectory <sourceDirectory>',
    'A directory pointing to your VueJs Application source files.'
  )
  .requiredOption(
     '-o --outputDirectory <outputDirectory>',
     'A directory where your compiled source files will be placed.'
   )
  .action((args) => NoBundleVue({ ...args, sourceDirectory: path.resolve(process.cwd(), args.sourceDirectory), outputDirectory: path.resolve(process.cwd(), args.outputDirectory) }));

program.parseAsync(process.argv);
