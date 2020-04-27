/* eslint-disable */
'use strict';
const program = require('commander');
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
  .action(NoBundleVue);
program.parse(process.argv);
