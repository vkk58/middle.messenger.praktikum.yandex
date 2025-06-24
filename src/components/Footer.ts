import Block from '../framework/Block';
import { Link } from '../components/Link';
import { ParamsForHBS } from '../helpers/commonInterference';

export class Footer extends Block {
  constructor(footerInfo:ParamsForHBS) {
    super({
      LinkCreate: new Link({
        href:     '#',
        datapage: footerInfo.linkPage,
        text:     footerInfo.text,
        class: 'footer-link',
      })
    });
  }

  override render(): string {
    return `<footer class="footer">
      {{{ LinkCreate }}}
    </footer>`;
  }
}
