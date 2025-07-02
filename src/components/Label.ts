import Block from '../framework/Block';

interface LabelProps {
  text: string,
  for: string
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({
      text: props.text,
      attr: {
        for: props.for,
      },
    });
  }

  override render(): string {
    return '<label>{{text}}</label>';
  }
}
