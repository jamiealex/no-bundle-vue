import { compileSFC } from './compiler';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { spawn } from 'child_process';
import { cleanDist } from './init';

const SRC_DIR = path.resolve(__dirname, '../exampleapp/src');
const OUTPUT_DIR = path.resolve(__dirname, '../exampleapp/dist');

async function snowpack(includePath: string): Promise<void> {
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
        includePath,
        '--dest',
        path.resolve(OUTPUT_DIR, './web_modules'),
      ],
      {
        cwd: path.resolve(SRC_DIR, '../'),
        stdio: 'inherit',
      }
    );
    proc.on('exit', (code: number) => {
      if (code > 0) return reject();
      resolve();
    });
  });
}

async function run(): Promise<void> {
  await cleanDist(OUTPUT_DIR);
  const sources = glob.sync(path.resolve(SRC_DIR, './**/*.vue'));
  for (const source of sources) {
    const code = await compileSFC(path.resolve(SRC_DIR, '../'), source);
    console.log(code);

    throw new Error('stop');
  }
  await snowpack(path.resolve(OUTPUT_DIR, './**/*.js'));
}

run();
