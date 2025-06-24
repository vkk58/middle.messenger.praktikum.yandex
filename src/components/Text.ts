import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Text extends Block {
  constructor(textInfo: ParamsForHBS) {
    super({        
        text: textInfo.text,
      attr: {
        tag:             textInfo.id,
        class:           textInfo.class
      },
      })
    };

  override render(): string {
    return `<p class="{{class}}">{{text}}</p>`;
  }
}
