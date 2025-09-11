import Block from '../framework/Block';
import { Label } from './Label';
import { Input } from './Input';
import PageValidator from '../framework/validate/PageValidator';
import CommonPageController from '../pages/commonPage/CommonPageController';

interface InputWithLabelProps {
  text: string;
  type: string;
  class: string;
  name: string;
  value?: string;
  list?: string;
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
          list: props.list || '',
          type: props.type,
          name: props.name,
          placeholder: props.placeholder || '',
          class: props.class,
          value: props.value || '',
          events: {
            blur: () => {
              PageValidator.validate(props.currentPage, props.name);
            },
            keydown: (event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            },
            input: () => {
              let timeout;
              if (props.name == 'search') {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  CommonPageController.getInstance()
                    .getUserSearchList()
                    .then(() => {
                      console.log('Поиск');
                    })
                    .catch((error) => {
                      console.error('ошибки:', error);
                    });
                }, 300);
              }
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
