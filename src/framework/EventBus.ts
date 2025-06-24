export type EventCallback = (...args: any[]) => void;

export default class EventBus {

    private listener: Record<string, EventCallback[]>;

    constructor() {
        
        this.listener = {};
    }

    public on(event:string, callback: EventCallback): void {
        if(!this.listener[event])
        {
            this.listener[event] = [];    
        }

        this.listener[event].push(callback);
    }

    public emit(event:string, ...args: any[]): void {
        if(!this.listener[event])
        {
            throw new Error('Событие не найдено: ${event}');            
        }

        this.listener[event].forEach(l => {l(...args)});
    }

    public off(event:string, callback: EventCallback): void {
        if(!this.listener[event])
        {
            throw new Error('Событие не найдено: ${event}');     
        }

        this.listener[event] = this.listener[event].filter(l => l!==callback);
    }
  
}