import Block from '../framework/Block';
import { Label } from './Label';
import { Input } from './Input';
import PageValidator from '../framework/validate/PageValidator';

interface InputWithLabelProps {
  text: string;
  type: string;
  class: string;
  name: string;
  value?: string;
  placeholder?: string;
  currentPage: string;
}

export class InputWithLabel extends Block {
  constructor(props: InputWithLabelProps) {
    super({
      children: {
        Label: new Label({
          text: props.text,
          for: props.name,
        }),
        Input: new Input({
          ...props,
          id: props.name,
          type: props.type,
          name: props.name,
          placeholder: props.placeholder || '',
          class: props.class,
          value: props.value || '',
          events: {
            blur: () => {
              PageValidator.validate(props.currentPage, props.name);
            },
          },
        }),
      },
    });
  }

  override render(): string {
    return `<div>
            {{{ Label }}}
            {{{ Input }}}
             </div>`;
  }
}
