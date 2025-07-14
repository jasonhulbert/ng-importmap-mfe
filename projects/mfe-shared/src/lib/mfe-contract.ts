export interface MfeLifecycle {
  mount(containerId: string, props?: Record<string, unknown>): Promise<void>;
  unmount(containerId: string): Promise<void>;
}
