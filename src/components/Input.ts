import Block from '../framework/Block';

export class Input extends Block {
  constructor(props: any) {
    super({
      ...props,
      attr: {
        id:             props.id,
        type:           props.type,
        name:           props.name,
        placeholder:    props.placeholder || '',
        value:          props.value || '',
        class:          props.class
      },
      })
    };

  override render(): string {
    return `<input>`;
  }
}