import * as Rollup from 'rollup';
import vue from 'rollup-plugin-vue';
// import { VueLoaderPlugin } from 'vue-loader';
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

import { cleanDist } from './init';

const SRC_DIR = path.resolve(__dirname, '../exampleapp/src');
const OUTPUT_DIR = path.resolve(__dirname, '../exampleapp/dist');


const IMPORT_REGEXP = /^\s*import\s(?!type(of\s|\s)(?!from)).*\sfrom\s['"](.*)['"].*$/gm;

async function moveIndex(): Promise<void> {
  return fs.promises.copyFile(path.resolve(SRC_DIR, './index.html'), path.resolve(OUTPUT_DIR, './index.html'));
}

function* getMatches(code: string, regExp: RegExp, captureGroup = 0): IterableIterator<string> {
  while (true) {
    const match = regExp.exec(code);
    if (match === null) {
      break;
    }
    yield match[captureGroup];
  };
}

async function compileVueWithVueLoader(vueSrc: string): Promise<void> {
  const code = fs.readFileSync(vueSrc, 'utf-8');
  // new VueLoaderPlugin(code);
}

async function compileVueFile(vueSrc: string): Promise<void> {
  let importStatements
  const rolledVueFile = await Rollup.rollup({
    input: vueSrc,
    plugins: [
      {
        name: 'HoistImportsPlugin',
        resolveId(source) {
          if (source !== vueSrc && !source.match(/\?rollup-plugin-vue=script.js$/)) {
            return {id: source, external: true};
          }
          return null;
        },
        transform(source, importer) {
          if (!importer.match(/\?rollup-plugin-vue=script.js/)) {
            let transformedSource:string = source
            importStatements = [...getMatches(source, IMPORT_REGEXP)]
            for (const importStatement of importStatements) {
              transformedSource = transformedSource.replace(importStatement, '')
            }
            return transformedSource
          }
        },
        intro () {
          return importStatements.map(str => str.replace('.vue', '.js')).join('\n');
        }
      },
      vue(),
      {
        name: 'TransformImport',
        renderChunk (code) {
          const transformedCode = code.replace(/vue-runtime-helpers\/(.*)\.mjs/g, `/web_modules/vue-runtime-helpers/$1.js`)
          return transformedCode
        }
      }
    ],
    external: ['vue']
  });

  const outputName = vueSrc
    .replace(SRC_DIR, OUTPUT_DIR)
    .replace(/(vue)$/, 'js');

  rolledVueFile.write({
    file: outputName,
    format: 'esm',
    // sourcemap: true,
  });
}

function getSources(): string[] {
  return glob.sync(path.resolve(SRC_DIR, './**/*.?(js|vue)'));
}

// Only needs to run once during the initial compile cycle. However, if a new import is found
// in dev mode, snowpack will be ran again.
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

async function run(): Promise<void> {
  await cleanDist(OUTPUT_DIR);
  const sources = glob.sync(path.resolve(SRC_DIR, './**/*.?(js|vue)'));
  for (const source of sources) {
    await compileVueFile(source);
  }
  await snowpack(path.resolve(OUTPUT_DIR, './**/*.js'));
  await moveIndex();
}

run();
