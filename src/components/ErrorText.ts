import Block from '../framework/Block';

export class ErrorText extends Block {
  constructor(props: any) {
    super({        
        text: props.text,
      attr: {
        class:           props.class
      },
      })
    };

  override render(): string {
    return `<h1>{{text}}</h1>`;
  }
}
