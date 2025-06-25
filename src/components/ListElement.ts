import Block from '../framework/Block';
import { Image } from "./Image";
import { Text } from "./Text";

export class ListElement extends Block {
  constructor(props: any) {
    super({      
        captionText : props.captionText || "", 
        Image:        new Image({image: props.image, class: props.class, alt: props.alt}),
        Text:         new Text({class: props.classSecond, text: props.text}),
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