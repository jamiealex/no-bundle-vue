import { parseSFC, compileSFCMain } from 'vite/dist/serverPluginVue';


export async function compileSFC (root: string, filename: string): Promise<string> {
  const descriptor = await parseSFC(root, filename);
  if (descriptor) {
    return compileSFCMain(
      descriptor,
      filename,
      filename,
      new Date().toISOString(),
    );

  }
  throw new Error('Can not parse');
}
