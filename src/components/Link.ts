import Block from '../framework/Block';
import PageRouter from '../framework/PageRouter';
interface LinkProps {
  datapage: string,
  text:     string,
  class:    string,
  href:     string
}
export class Link extends Block {
  constructor(props: LinkProps) {
    let router = new PageRouter();
    super({
      ...props,
      events: {
        click: () => {
          router.go(props.datapage);
        }
      },
      attr: {
        href:     props.href,
        class:    props.class,
        datapage: props.datapage,
      }        
      });    
  }
/*
  changePage() {
    
  }
*/
  override render() {
    return '<a>{{text}}</a>';
  }
}
