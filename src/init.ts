import rimraf from 'rimraf';
import util from 'util';
import glob from 'glob';
import path from 'path';

const rimrafPromise = util.promisify(rimraf);

export function getAbsolutePath (directory: string): string {
  return path.resolve(process.cwd(), directory);
}

export async function cleanDirectory (directory: string): Promise<void> {
    return rimrafPromise(directory);
}

export function getSourceFiles(directory: string): string[] {
  return glob.sync(path.resolve(directory, './**/*.?(ts|js|vue)'));
}
