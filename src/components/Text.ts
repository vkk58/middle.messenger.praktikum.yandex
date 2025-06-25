import Block from '../framework/Block';

export class Text extends Block {
  constructor(props: any) {
    super({        
        text: props.text,
      attr: {
        class: props.class
      },
      })
    };

  override render(): string {
    return `<p>{{text}}</p>`;
  }
}
