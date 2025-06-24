import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Image extends Block {
  constructor(imageInfo: ParamsForHBS) {
    super({
      attr: {
        src:    imageInfo.image,
        class:  imageInfo.class,
        alt:    imageInfo.alt
      },
      })
    };

  override render(): string {
    return `<img />`;
  }
}