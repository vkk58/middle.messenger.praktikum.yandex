import Block from '../framework/Block';
import { Image } from "./Image";
import { Text } from "./Text";
import { ParamsForHBS } from '../helpers/commonInterference';

export class ListElement extends Block {
  constructor(listElementsInfo: ParamsForHBS) {
    super({      
        captionText : listElementsInfo.captionText || "", 
        Image:        new Image({image: listElementsInfo.image, class: listElementsInfo.class, alt: listElementsInfo.alt}),
        Text:         new Text({class: listElementsInfo.classSecond, text: listElementsInfo.text}),
      })
    };

  override render(): string {
    return `<figure class="gridElementCommonPage">
            <figcaption class="contactTextType">{{captionText}}</figcaption>
            <form class="messageContainer">     
            {{{ Image }}}
            {{{ Text  }}}
            </form>
            <div class="lineBreak"></div>
            </figure>`;
  }
}