import vue from 'rollup-plugin-vue';
import * as Rollup from 'rollup';
import glob from 'glob';
import path from 'path';
import rimraf from 'rimraf';
import fs from 'fs';
import util from 'util';
import { spawn } from 'child_process';

const SRC_DIR = path.resolve(__dirname, '../exampleapp/src');
const OUTPUT_DIR = path.resolve(__dirname, '../exampleapp/dist');

const rimrafPromise = util.promisify(rimraf);

async function cleanDist (): Promise<void> {
  return rimrafPromise(OUTPUT_DIR);
}

async function moveIndex (): Promise<void> {
  return fs.promises.copyFile(path.resolve(SRC_DIR, './index.html'), path.resolve(OUTPUT_DIR, './index.html'));
}

async function compileVueFile (vueSrc: string): Promise<void> {
  const rolledVueFile = await Rollup.rollup({
    input: vueSrc,
    plugins: [vue()],
    external: ['vue']
  });

  const outputName = vueSrc
    .replace(SRC_DIR, OUTPUT_DIR)
    .replace(/(vue)$/, 'js');

  rolledVueFile.write({
    file: outputName,
    format: 'esm',
    sourcemap: true,
  });
}

function getSources (): string[] {
  return glob.sync(path.resolve(SRC_DIR, './**/*.?(js|vue)'));
}

// Only needs to run once during the initial compile cycle. However, if a new import is found
// in dev mode, snowpack will be ran again.
async function snowpack(includeFiles: string): Promise<void> {
  const snowpackLocation = path.resolve(
      require.resolve('snowpack'),
      '../index.bin.js'
  );

  await new Promise((resolve, reject) => {
      const proc = spawn(
          'node',
          [
              snowpackLocation,
              '--include',
              includeFiles,
              '--dest',
              path.resolve(OUTPUT_DIR, './web_modules'),
          ],
          {
              // Inherit so snowpack's log coloring is passed through
              stdio: 'inherit',
          }
      );
      proc.on('exit', (code: number) => {
          if (code > 0) return reject();
          resolve();
      });
  });
  console.log('\n'); // Just add some spacing...
}

async function run (): Promise<void> {
  await cleanDist();
  const sources = getSources();
  for (const source of sources) {
    await compileVueFile(source);
  }
  await snowpack(path.resolve(SRC_DIR, './**/*.js'));
  await moveIndex();
}

run();
