import Block from '../framework/Block';

interface ButtonProps {
  text:   string,
  id:     string,
  type:   string,
  class:  string,
  events?: Record<string, () => void>;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      attr: {
        id:       props.id,
        class:    props.class,
        type:     props.type,
      },
      })
    };

  override render(): string {
    return `<button>{{text}}</button>`;
  }
}
