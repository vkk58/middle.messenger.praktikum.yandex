import Block from '../framework/Block';

interface ErrorTextProps {
  text: string,
  class: string
}

export class ErrorText extends Block {
  constructor(props: ErrorTextProps) {
    super({
      text: props.text,
      attr: {
        class: props.class,
      },
    });
  }

  override render(): string {
    return '<h1>{{text}}</h1>';
  }
}
