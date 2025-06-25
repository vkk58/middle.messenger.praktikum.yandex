import Block from '../framework/Block';
import CommonValidator from '../framework/CommonValidate';
import PageRouter from '../framework/PageRouter';

export class Button extends Block {
  constructor(props: any) {
    let router        = new PageRouter();
    let dataValidator = new CommonValidator();
    super({
      ...props,
      text:     props.text,
      events: {
        click: () => {
          if(props.buttonRoute)
          {
            if(props.type == "submit" && dataValidator.validateInputs(props.currentPage)) {
              router.go(props.buttonRoute);
            }
          }
        },
      },
      attr: {
        id:       props.id,
        class:    props.class,
        type:     props.type,
      },
      })
    };

  override render(): string {
    return `<button>{{text}}</button>`;
  }
}
