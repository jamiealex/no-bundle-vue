
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
}: NoBundleVueOptions): Promise<void> {
  const absoluteSourceDirectory = getAbsolutePath(sourceDirectory);
  const absoluteOutputDirectory = getAbsolutePath(outputDirectory);

  await cleanDirectory(absoluteOutputDirectory);

  for (const sourceFile of getSourceFiles(absoluteSourceDirectory)) {
    await compileSourceFile(sourceFile, absoluteSourceDirectory, absoluteOutputDirectory, config);
  }

  await snowpack(absoluteSourceDirectory, absoluteOutputDirectory);
  await moveIndex(absoluteSourceDirectory, absoluteOutputDirectory);
}
