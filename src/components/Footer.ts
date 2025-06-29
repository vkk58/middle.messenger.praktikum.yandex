import Block from '../framework/Block';
import { Link } from './Link';

interface FooterProps {
  linkPage: string,
  text: string
}

export class Footer extends Block {
  constructor(props:FooterProps) {
    super({
      children: {
        LinkCreate: new Link({
          href: '#',
          datapage: props.linkPage,
          text: props.text,
          class: 'footer-link',
        }),
      },
    });
  }

  override render(): string {
    return `<footer class="footer">
      {{{ LinkCreate }}}
    </footer>`;
  }
}
