import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Label extends Block {
  constructor(labelInfo: ParamsForHBS) {
    super({
        text: labelInfo.text,
      attr: {
        for: labelInfo.for
      },
      })
    };

  override render(): string {
    return `<label>{{text}}</label>`;
  }
}