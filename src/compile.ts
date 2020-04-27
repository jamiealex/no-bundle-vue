import * as Rollup from 'rollup';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';

export async function compileSourceFile(sourceFile: string, sourceDirectory: string, outputDirectory: string): Promise<void> {
  let importStatements: string[];
  const rolledVueFile = await Rollup.rollup({
    input: sourceFile,
    plugins: [
      {
        name: 'HoistImportsPlugin',
        resolveId(source) {
          if (source !== sourceFile && !source.match(/\?rollup-plugin-vue=script.?(js|ts)$/)) {
            return {id: source, external: true};
          }
          return null;
        },
        transform(source, importer) {
          if (!importer.match(/\?rollup-plugin-vue=script.?(js|ts)/)) {
            let transformedSource:string = source
            importStatements = [...getImportStatements(source)]
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
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue({
        beforeAssemble (descriptor) {
          console.log(descriptor);
          return descriptor;
        },
        style: {
          postcssPlugins: [
            postcssPresetEnv({
              preserve: false,
              features: {
                'nesting-rules': true,
                'custom-media-queries': true,
                'color-functional-notation': true,
                'color-mod-function': true,
              },
            }),
          ]
        }
      }),
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

  const outputName = sourceFile
    .replace(sourceDirectory, outputDirectory)
    .replace(/(.vue|.ts)$/, '.js');

  rolledVueFile.write({
    file: outputName,
    format: 'esm',
    // sourcemap: true,
  });
}

const IMPORT_REGEXP = /^\s*import\s(?!type(of\s|\s)(?!from)).*\sfrom\s['"](.*)['"].*$/gm;

function* getImportStatements(code: string): IterableIterator<string> {
  while (true) {
    const match = IMPORT_REGEXP.exec(code);
    if (match === null) {
      break;
    }
    yield match[0];
  };
}
