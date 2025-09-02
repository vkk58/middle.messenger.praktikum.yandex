import Block, { BlockProps, TST } from "../framework/Block";
import { IChat } from "../types";
import { ListElement } from "./ListElement";

interface ListElementProps extends Omit<BlockProps, "props"> {
  props: ListElementPropsTST;
}

interface ListElementPropsTST extends TST {
  class?: string;
  chats: ListElement[];
}

export class ChatsList extends Block {
  constructor(props: ListElementProps) {
    let originalProps = {
      ...props,
      children: {},
      events: {},
    };
    super(originalProps);
    this.setProps(this.createChatBlocks());
  }

  protected componentDidUpdate(
    oldProps: ListElementProps,
    newProps: ListElementProps
  ): boolean {
    debugger;
    if (oldProps.chats !== newProps.chats) {
      this.props.chats = this.createChatBlocks();
    }
    return true;
  }

  private createChatBlocks(): ListElementProps {
    debugger;
    return {
      props: {
        chats: [
          new ListElement({
            image:
              "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig",
            class: "miniImg",
            alt: "Пользователь32",
            text: "Последнее сообщение",
            classSecond: "contactTextMessageType",
            captionText: "Друг3211",
          }),
          new ListElement({
            image:
              "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig",
            class: "miniImg",
            alt: "Пользователь12",
            text: "Последнее сообщение",
            classSecond: "contactTextMessageType",
            captionText: "Друг23422",
          }),
        ],
      },
    };
  }

  override render(): string {
    return /*html*/ `<main class="gridCommonPage">    
           {{{chats}}}
            </main>`;
  }
}
