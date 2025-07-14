import type { MfeLifecycle } from './mfe-contract';

const mfeCache = new Map<string, MfeLifecycle>();

const importMap: Record<string, string> = {
  'mfe-app-1': '/assets/mfe-app-1/bootstrap.js',
  'mfe-app-2': '/assets/mfe-app-2/bootstrap.js'
};

export async function loadMfe(name: string): Promise<MfeLifecycle> {
  if (!mfeCache.has(name)) {
    const url = importMap[name];

    if (!url) {
      throw new Error(`MFE "${name}" not found in import map.`);
    }

    const mfe = await import(/* @vite-ignore */ url) as MfeLifecycle;

    if (!mfe.mount || !mfe.unmount) {
      throw new Error(`MFE "${name}" does not implement the required lifecycle methods.`);
    }

    mfeCache.set(name, mfe);
  }

  return mfeCache.get(name)!;
}
