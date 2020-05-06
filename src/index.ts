
import { getAbsolutePath, cleanDirectory, getSourceFiles } from './init';
import { compileSourceFile } from './compile';
import { snowpack } from './snowpack';
import { moveIndex } from './end';
import { NoBundleVueOptions } from './types';

const defaultConfig: NoBundleVueOptions['config'] = {
  vueRollupOptions: undefined,
  rollupPlugins: []
}
export default async function noBundleVue({
  sourceDirectory,
  outputDirectory,
  config = defaultConfig
}): Promise<void> {

  await cleanDirectory(outputDirectory);

  for (const sourceFile of getSourceFiles(sourceDirectory)) {
    console.log(sourceFile);
    await compileSourceFile(sourceFile, sourceDirectory, outputDirectory, config);
  }

  await snowpack(sourceDirectory, outputDirectory);
  await moveIndex(sourceDirectory, outputDirectory);
}
