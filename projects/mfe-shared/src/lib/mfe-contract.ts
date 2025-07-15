export interface MfeLifecycle {
  mount(containerId: string, rootSelector: string, props?: Record<string, unknown>): Promise<void>;
  unmount(containerId: string): Promise<void>;
  show?(): void;
  hide?(): void;
}
