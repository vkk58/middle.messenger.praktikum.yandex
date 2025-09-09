import Block, { BlockProps } from "../framework/Block";
import { TextMessage } from "./TextMessage";

interface MessageProps extends BlockProps {
  chatStock: TextMessage[];
}

export class MessageContainer extends Block {
  constructor(props: MessageProps) {
    super({
      children: {},
      lists: props.chatStock || [],
    });
  }

  public updateMessages(newChatStock: TextMessage[]): void {
    console.log(newChatStock);
    this.setProps({
      ...this.props,
      chatStock: newChatStock,
    } as MessageProps);
  }

  protected componentDidUpdate(
    oldProps: MessageProps,
    newProps: MessageProps
  ): boolean {
    if (oldProps.chatStock !== newProps.chatStock) {
      this.lists = { lists: newProps.chatStock } as any;
      return true;
    }

    return false;
  }

  override render(): string {
    return /*html*/ `<main class="messages-container">
                      {{{lists}}}
                    </main>  `;
  }
}
