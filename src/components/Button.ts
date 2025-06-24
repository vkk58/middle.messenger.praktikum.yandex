import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';
import PageRouter from '../framework/PageRouter';

export class Button extends Block {
  constructor(buttonInfo: ParamsForHBS) {
    let router = new PageRouter();
    super({
      text:     buttonInfo.text,
      events: {
        click: () => {
          if(buttonInfo.buttonRoute)
          {
            router.go(buttonInfo.buttonRoute);
          }
        },
      },
      attr: {
        id:       buttonInfo.id,
        class:    buttonInfo.class,
        type:     buttonInfo.type
      },
      })
    };

  override render(): string {
    return `<button>{{text}}</button>`;
  }
}
