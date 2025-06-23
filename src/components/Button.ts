/*
export default `<button id="{{id}}" class="{{class}}" type={{type}}
{{#if disabled}}
  disabled
{{/if}}>{{text}}</button>`;
*/
import Block from '../framework/Block';
import { ParamsForHBS } from '../helpers/commonInterference';
import PageRouter from '../framework/PageRouter';

export class Button extends Block {
  constructor(buttonInfo: ParamsForHBS) {
    let router = new PageRouter();
    super({
      text:     buttonInfo.text,
      onClick: (event: Event) => {
          console.log('CLICK');          
          event.preventDefault();
          event.stopPropagation();
          if(buttonInfo.buttonRoute)
          {
            router.go(this.props.datapage);
          }
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
