import fs from 'fs';
import path from 'path';

export async function moveIndex(sourceDirectory: string, outputDirectory: string): Promise<void> {
  return fs.promises.copyFile(
    path.resolve(sourceDirectory, './index.html'),
    path.resolve(outputDirectory, './index.html')
  );
}
