import Block from '../framework/Block';
import { Label } from "./Label";
import { Input } from "./Input";
import { ParamsForHBS } from '../helpers/commonInterference';

export class InputWithLabel extends Block {
  constructor(inputwithLabelInfo: ParamsForHBS) {
    super({      
        Label: new Label({
            text: inputwithLabelInfo.text, 
            for:  inputwithLabelInfo.name
                            }),
        Input: new Input({
            id: inputwithLabelInfo.name, 
            type: inputwithLabelInfo.type, 
            name: inputwithLabelInfo.name, 
            placeholder: inputwithLabelInfo.placeholder, 
            class: inputwithLabelInfo.class,
            value: inputwithLabelInfo.value
        }),
      })
    };

  override render(): string {
    return `<form>
            {{{ Label }}}
            {{{ Input }}}
             </form>`;
  }
}