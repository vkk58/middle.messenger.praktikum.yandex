//export default `<input id="{{id}}" type="{{type}}" name="{{id}}" placeholder="{{placeholder}}" value="{{value}}" class="{{class}}">`;
import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Input extends Block {
  constructor(inputInfo: ParamsForHBS) {
    super({
      attr: {
        id:             inputInfo.id,
        type:           inputInfo.type,
        name:           inputInfo.name,
        placeholder:    inputInfo.placeholder,
        value:          inputInfo.value,
        class:          inputInfo.class
      },
      })
    };

  override render(): string {
    return `<input>`;
  }
}