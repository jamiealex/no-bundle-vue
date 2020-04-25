import rimraf from 'rimraf';
import util from 'util';

const rimrafPromise = util.promisify(rimraf);

export async function cleanDist(distFolder: string): Promise<void> {
    return rimrafPromise(distFolder);
}
