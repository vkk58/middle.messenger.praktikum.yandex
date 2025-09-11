import { Footer } from '../../components/Footer';
import { ErrorText } from '../../components/ErrorText';
import { Text } from '../../components/Text';
import Block from '../../framework/Block';

export default class StartPage extends Block {
  constructor(errorTxt: string, errorDesc: string) {
    super({
      children: {
        ErrorText: new ErrorText({ text: errorTxt, class: 'errorTitleText' }),
        ErrorDescription: new Text({
          text: errorDesc,
          class: 'errorDescriptionText',
        }),
        Footer: new Footer({ linkPage: 'commonPage', text: 'Назад к чатам' }),
      },
    });
  }

  override render(): string {
    return `<main class="app">            
                {{{ ErrorText }}}
                <main>
                {{{ ErrorDescription }}}
                {{{ Footer }}}
                </main>
                </main> `;
  }
}
