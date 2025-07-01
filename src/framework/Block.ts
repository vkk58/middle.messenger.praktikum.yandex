import Handlebars from 'handlebars';
import EventBus, { EventCallback } from './EventBus';

interface BlockProps {
  props?: {
    id: string;
    type?: string;
  };
  events?: Record<string, (e?: Event) => void>;
  attr?: Record<string, string>;
  children?: Record<string, Block>;
  lists?: Block[];
  text?: string;
  message?: string;
  captionText?: string;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected _element: HTMLElement | null = null;

  protected _id: number = Math.floor(100000 + Math.random() * 900000);

  protected props: BlockProps;

  protected children: Record<string, Block>;

  protected lists: Record<string, Block[]>;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: BlockProps) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = props.children ? props.children : children;
    this.lists = this._makePropsProxyForBlock({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const events: Record<string, () => void> = this.props.events
      ? { ...this.props.events }
      : {};

    Object.entries(events).forEach(([eventName, handler]) => {
      if (this._element && typeof handler === 'function') {
        this._element.addEventListener(eventName, handler);
      }
    });
  }

  

  private _removeEvents(): void {
    const events: Record<string, () => void> = this.props.events
      ? { ...this.props.events }
      : {};

    Object.entries(events).forEach(([eventName, handler]) => {
      debugger;
      if (this._element && typeof handler === 'function') {
        this._element.removeEventListener(eventName, handler as EventListener);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => { child.dispatchComponentDidMount(); });
  }

  protected componentDidMount(): void {
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    console.log(oldProps, newProps);
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>,
    props: BlockProps,
    lists: Record<string, Block[]>
  } {
    const children: Record<string, Block> = {};
    const props: Partial<BlockProps> = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        const validKey = key as keyof BlockProps;
        props[validKey] = value;
      }
    });

    return {
      children,
      props: props as BlockProps,
      lists,
    };
  }

  protected addAttributes(): void {
    if (!this.props.attr) return;
    const attr = this.props.attr;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  protected setAttributes(attr: Record<string, string>): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: Record<string, unknown> = {
      ...this.props,
      ...Object.fromEntries(
        Object.entries(this.children).map(([key, child]) => [key, `<div data-id="${child._id}"></div>`]),
      ),
      ...Object.fromEntries(
        Object.entries(this.lists).map(([key]) => [key, `<div data-id="__l_${this._id}"></div>`]),
      ),
    };

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.getContent());
    });

    Object.entries(this.lists).forEach(([, items]) => {
      const listCont = this._createDocumentElement('template');
      items.forEach((item) => {
        listCont.content.append(
          item instanceof Block ? item.getContent() : document.createTextNode(String(item)),
        );
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${this._id}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    this._removeEvents();
    this._element?.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  public render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    // const self = this;
    return new Proxy(props, {
      get(target: BlockProps, prop: string | symbol) {
        if (typeof prop === 'symbol') {
          return Reflect.get(target, prop);
        }
        const value = (target as Record<string, unknown>)[prop];
        if (typeof value === 'function') {
          return value.bind(target);
        }

        return value;
      },
      set<K extends keyof BlockProps>(target: BlockProps, prop: K, value: BlockProps[K]): boolean {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('No access');
      },
    });
  }

  private _makePropsProxyForBlock(props: Record<string, Block[]>): Record<string, Block[]> {
    return new Proxy(props, {
      get(target: Record<string, Block[]>, prop: string): Block[] | undefined {
        return target[prop];
      },
      set(target: Record<string, Block[]>, prop: string, value: unknown): boolean {
        if (!Array.isArray(value) || !value.every((item) => item instanceof Block)) {
          throw new Error('Это не массив');
        }
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }
}
