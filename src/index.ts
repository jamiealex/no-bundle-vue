
import { getAbsolutePath, cleanDirectory, getSourceFiles } from './init';
import { compileSourceFile } from './compile';
import { snowpack } from './snowpack';
import { moveIndex } from './end';

type NoBundleVueOptions = {
  sourceDirectory: string;
  outputDirectory: string;
};

export default async function noBundleVue({
  sourceDirectory,
  outputDirectory,
}: NoBundleVueOptions): Promise<void> {
  const absoluteSourceDirectory = getAbsolutePath(sourceDirectory);
  const absoluteOutputDirectory = getAbsolutePath(outputDirectory);

  await cleanDirectory(absoluteOutputDirectory);

  for (const sourceFile of getSourceFiles(absoluteSourceDirectory)) {
    await compileSourceFile(sourceFile, absoluteSourceDirectory, absoluteOutputDirectory);
  }

  await snowpack(absoluteSourceDirectory, absoluteOutputDirectory);
  await moveIndex(absoluteSourceDirectory, absoluteOutputDirectory);
}

// For dev:build script to work.
if (process.env.npm_lifecycle_script?.includes('ts-node')) {
  noBundleVue({
    sourceDirectory: './example/src',
    outputDirectory: './example/dist',
  });
}
