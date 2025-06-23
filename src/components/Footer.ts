/*
export default `<footer class="footer">
  {{> Link href="#" class="footer-link" data-page=linkPage text=textFooter}}
</footer>`;
*/
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
        onClick: (event: Event) => {
          console.log('CLICK');          
          event.preventDefault();
          event.stopPropagation();
        },
      })
    });
  }

  override render(): string {
    return `<footer class="footer">
      {{{ LinkCreate }}}
    </footer>`;
  }
}
