import Block from '../framework/Block';

interface TextProps {
  class: string,
  text: string
}

export class Text extends Block {
  constructor(props: TextProps) {
    super({
      text: props.text,
      attr: {
        class: props.class,
      },
    });
  }

  override render(): string {
    return '<p>{{text}}</p>';
  }
}
