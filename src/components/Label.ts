import Block from '../framework/Block';

export class Label extends Block {
  constructor(props: any) {
    super({
        text: props.text,
      attr: {
        for: props.for
      },
      })
    };

  override render(): string {
    return `<label>{{text}}</label>`;
  }
}