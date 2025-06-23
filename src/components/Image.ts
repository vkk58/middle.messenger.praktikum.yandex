//export default `<img src="{{image}}" class="{{className}}" alt="{{alt}}"></img>`;
import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Image extends Block {
  constructor(imageInfo: ParamsForHBS) {
    super({
      attr: {
        image:      imageInfo.image,
        className:  imageInfo.class,
        alt:        imageInfo.alt
      },
      })
    };

  override render(): string {
    return `<img />`;
  }
}