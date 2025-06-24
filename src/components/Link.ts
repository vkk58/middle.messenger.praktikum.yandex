import Block from '../framework/Block';
import PageRouter from '../framework/PageRouter';

export class Link extends Block {
  constructor(props: any) {
    let router = new PageRouter();
    super({
      ...props,
      events: {
        click: () => {
          router.go(this.props.datapage);
        },
      }
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
