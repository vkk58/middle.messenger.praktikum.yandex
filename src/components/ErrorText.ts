import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class ErrorText extends Block {
  constructor(textInfo: ParamsForHBS) {
    super({        
        text: textInfo.text,
      attr: {
        class:           textInfo.class
      },
      })
    };

  override render(): string {
    return `<h1>{{text}}</h1>`;
  }
}
