import Block, { BlockProps } from '../framework/Block';
import CommonPageController from '../pages/commonPage/CommonPageController';
import { Image } from './Image';
import { Text } from './Text';

export interface ListElementProps extends BlockProps {
  captionText: string;
  image: string;
  class: string;
  alt: string;
  classSecond: string;
  text: string;
  classSelectedChat?: string;
  id?: string;
}

export class ListElement extends Block {
  constructor(props: ListElementProps) {
    super({
      attr: {
        id: props.id || '',
        class: props.classSelectedChat || '',
      },
      captionText: props.captionText || '',
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
          const lists = document.querySelectorAll('.selectedCurrentChat');
          lists.forEach((el) => {
            el.classList.remove('selectedCurrentChat');
          });
          if (this._element) {
            this._element.classList.add('selectedCurrentChat');
            const commonPage = CommonPageController.getInstance();
            commonPage.chatId = Number(this._element.getAttribute('id'));
            commonPage
              .initWebSocket(commonPage.chatId)
              .then(() => {
                console.log('Соединение установлено');
              })
              .catch((error) => {
                console.error('При соединении возникли ошибки:', error);
              });
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
