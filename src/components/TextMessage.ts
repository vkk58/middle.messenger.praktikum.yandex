import Block from "../framework/Block";

interface TextMessageProps {
  class: string;
  text: string;
}

export class TextMessage extends Block {
  constructor(props: TextMessageProps) {
    super({
      text: props.text,
      attr: {
        class: props.class,
      },
    });
  }

  override render(): string {
    return `<div>
            {{ text }}
            </div>`;
  }
}
