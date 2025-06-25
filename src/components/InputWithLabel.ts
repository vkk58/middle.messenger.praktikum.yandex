import Block from '../framework/Block';
import { Label } from "./Label";
import { Input } from "./Input";

export class InputWithLabel extends Block {
  constructor(props:any) {
    super({   

        Label: new Label({
            text: props.text, 
            for:  props.name
                            }),
        Input: new Input({
            ...props,
            id: props.name, 
            type: props.type, 
            name: props.name, 
            placeholder: props.placeholder, 
            class: props.class,
            value: props.value
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