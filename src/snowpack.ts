import path from 'path';
import { spawn } from 'child_process';

export async function snowpack(sourceDirectory: string, outputDirectory: string): Promise<void> {
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
        path.resolve(outputDirectory, './**/*.js'),
        '--dest',
        path.resolve(outputDirectory, './web_modules'),
        '--optimize'
      ],
      {
        // Super opinionated. Need to find the nearest node_modules folder for this
        cwd: path.resolve(sourceDirectory, '../'),
        stdio: 'inherit',
      }
    );
    proc.on('exit', (code: number) => {
      if (code > 0) return reject();
      resolve();
    });
  });
}
