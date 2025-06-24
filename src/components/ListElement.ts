import Block from '../framework/Block';
import { Image } from "./Image";
import { Text } from "./Text";
import { ParamsForHBS } from '../helpers/commonInterference';

export class ListElement extends Block {
  constructor(listElementsInfo: ParamsForHBS) {
    super({      
        Image:  new Image({image: listElementsInfo.image, class: listElementsInfo.class, alt: listElementsInfo.alt}),
        Text:   new Text({class: listElementsInfo.classSecond, text: listElementsInfo.text}),
      })
    };

  override render(): string {
    return `<div class="messageContainer">     
            {{{ Image }}}
            {{{ Text  }}}
            </div>
            <div class="lineBreak"></div>`;
  }
}