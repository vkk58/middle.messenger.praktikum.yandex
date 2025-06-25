import Block from '../framework/Block';
import { Link } from '../components/Link';

export class Footer extends Block {
  constructor(props:any) {
    super({
      LinkCreate: new Link({
        href:     '#',
        datapage: props.linkPage,
        text:     props.text,
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
