import Block from '../framework/Block';

interface ImageProps {
  image:  string,
  class:  string,
  alt:    string,
}

export class Image extends Block {
  constructor(props:ImageProps) {
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