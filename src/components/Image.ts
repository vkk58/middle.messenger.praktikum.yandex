import Block from '../framework/Block';

export class Image extends Block {
  constructor(props:any) {
    super({
      attr: {
        src:    props.image,
        class:  props.class,
        alt:    props.alt
      },
      })
    };

  override render(): string {
    return `<img />`;
  }
}