import Block from '../framework/Block';

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  class: string;
  list?: string;
  events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      attr: {
        list: props.list || '',
        id: props.id,
        type: props.type,
        name: props.name,
        placeholder: props.placeholder || '',
        value: props.value || '',
        class: props.class,
      },
    });
  }

  override render(): string {
    return '<input>';
  }
}
