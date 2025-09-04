import Block, { BlockProps } from "../framework/Block";
import { ListElement } from "./ListElement";

interface ListProps extends BlockProps {
  chats: ListElement[];
}

export class ChatsList extends Block {
  constructor(props: ListProps) {
    const safeProps = {
      ...props,
      chats: props.chats || [],
    };
    console.log(safeProps);
    super(safeProps);
  }

  public updateChats(newChats: ListElement[]): void {
    console.log("newChats = ", newChats);
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
      return true;
    }

    return false;
  }

  override render(): string {
    return /*html*/ `<main class="gridCommonPage">    
           {{{chats}}}
            </main>`;
  }
}
