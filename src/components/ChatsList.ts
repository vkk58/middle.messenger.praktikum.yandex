import Block, { BlockProps } from "../framework/Block";
import { ListElement } from "./ListElement";

interface ListProps extends BlockProps {
  chats: ListElement[];
}

export class ChatsList extends Block {
  constructor(props: ListProps) {
    super({
      children: {},
      lists: props.chats || [],
    });
  }

  public updateChats(newChats: ListElement[]): void {
    this.setProps({
      ...this.props,
      chats: newChats,
    } as ListProps);
  }

  protected componentDidUpdate(
    oldProps: ListProps,
    newProps: ListProps
  ): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.lists = { lists: newProps.chats } as any;
      return true;
    }

    return false;
  }

  override render(): string {
    return /*html*/ `<main class="gridCommonPage">    
           {{{ lists }}}
            </main>`;
  }
}
