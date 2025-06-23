//export default `<a href="{{href}}" class="{{class}}" data-page="{{data-page}}">{{text}}</a>`;
import Block from '../framework/Block';
import PageRouter from '../framework/PageRouter';

export class Link extends Block {
  constructor(props: any) {
    let router = new PageRouter();
    super({
      ...props,
      events: {
        click: (e: Event) => {
          props.onClick(e);
          router.go(this.props.datapage);
        },
      },
      attr: {
        class: 'footer-link',
      },
    });    
  }
/*
  changePage() {
    
  }
*/
  override render() {
    return '<a href="{{href}}" class="{{class}}" data-page="{{datapage}}">{{text}}</a>';
  }
}
