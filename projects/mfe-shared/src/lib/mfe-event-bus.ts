const listeners = new Map<string, Set<(data: any) => void>>();

export function subscribe(event: string, listener: (data: any) => void): void {
    if (!listeners.has(event)) {
        listeners.set(event, new Set());
    }
    listeners.get(event)!.add(listener);
}

export function publish(event: string, data: any): void {
    if (listeners.has(event)) {
        for (const listener of listeners.get(event)!) {
            listener(data);
        }
    }
}
