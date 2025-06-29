export type EventCallback<Args extends unknown[] = unknown[]> = (...args: Args) => void;

export default class EventBus<Events extends Record<string, unknown[]> = Record<string, unknown[]>> {
  private listeners: {
    [E in keyof Events]?: EventCallback<Events[E]>[]
  } = {};

  public on<Event extends keyof Events>(
    event: Event,
    callback: EventCallback<Events[Event]>,
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  public emit<Event extends keyof Events>(
    event: Event,
    ...args: Events[Event]
  ): void {
    const callbacks = this.listeners[event];
    if (!callbacks) {
      throw new Error(`Событие не найдено: ${String(event)}`);
    }
    callbacks.forEach((callback) => callback(...args));
  }

  public off<Event extends keyof Events>(
    event: Event,
    callback: EventCallback<Events[Event]>,
  ): void {
    const callbacks = this.listeners[event];
    if (!callbacks) {
      throw new Error(`Событие не найдено: ${String(event)}`);
    }
    this.listeners[event] = callbacks.filter((cb) => cb !== callback);
  }
}
