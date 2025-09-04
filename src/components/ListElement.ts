import Block from "../framework/Block";
import { Image } from "./Image";
import { Text } from "./Text";

export interface ListElementProps {
  captionText: string;
  image: string;
  class: string;
  alt: string;
  classSecond: string;
  text: string;
}

export class ListElement extends Block {
  constructor(props: ListElementProps) {
    super({
      captionText: props.captionText || "",
      children: {
        Image: new Image({
          image: props.image,
          class: props.class,
          alt: props.alt,
        }),
        Text: new Text({ class: props.classSecond, text: props.text }),
      },
      events: {
        click: () => {
          let lists = document.querySelectorAll(".active");
          lists.forEach((el) => {
            el.classList.remove("active");
          });
          if (this._element) {
            this._element.classList.add("active");
          }
        },
      },
    });
  }

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
