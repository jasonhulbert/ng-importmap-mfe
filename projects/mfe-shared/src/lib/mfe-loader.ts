import type { MfeLifecycle } from './mfe-contract';

export async function loadMfe(name: string): Promise<MfeLifecycle> {
  const module = await import(/* @vite-ignore */name);
  const lifecycle = module.default as MfeLifecycle;

  if (!lifecycle || typeof lifecycle.mount !== 'function' || typeof lifecycle.unmount !== 'function') {
    throw new Error(`MFE ${name} does not have a valid lifecycle`);
  }

  return lifecycle;
}
