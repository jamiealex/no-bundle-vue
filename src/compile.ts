import * as Rollup from 'rollup';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';

const ABS_PATH_PLACEHOLDER = './__*$placeholder$*__';

export async function compileSourceFile(sourceFile: string, sourceDirectory: string, outputDirectory: string): Promise<void> {
  let importStatements: string[];
  const rolledVueFile = await Rollup.rollup({
    input: sourceFile,
    plugins: [
      {
        name: 'HoistImportsPlugin',
        resolveId(source) {
          if (source !== sourceFile && !source.match(/\?rollup-plugin-vue=script\..*$/)) {
            const transformedSource: string = source.startsWith('/') ? `${ABS_PATH_PLACEHOLDER}${source}` : source
            return { id: transformedSource, external: true };
          }
          return null;
        },
      },
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue({
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
        renderChunk(code) {
          let transformedCode = code.replace(/vue-runtime-helpers\/(.*)\.mjs/g, `/web_modules/vue-runtime-helpers/$1.js`)
          transformedCode = transformedCode.replace(new RegExp(escapeStringForRegexp(ABS_PATH_PLACEHOLDER), 'g'), '')
          transformedCode = transformedCode.replace(/.vue(['"`])/g, '.js$1') // TODO better regexp to prevent leaks
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

function escapeStringForRegexp(string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}