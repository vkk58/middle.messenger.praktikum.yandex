import { chatAPI } from "../api/ChatApi";
import Block, { BlockProps } from "../framework/Block";
import { Global } from "../helpers/functions";
import CommonPageController from "../pages/commonPage/CommonPageController";
import { Button } from "./Button";
import { Image } from "./Image";
import { Input } from "./Input";
import { InputWithLabel } from "./InputWithLabel";

interface DialogProps extends BlockProps {
  class?: string;
  visible?: boolean;
}

export class Dialog extends Block {
  private pageController: CommonPageController;
  public visible: boolean;
  private InputWithLabelChatName: InputWithLabel;
  constructor(props: DialogProps) {
    const globalClass = new Global();
    const InputWithLabelChatName = new InputWithLabel({
      text: "Название чата",
      name: "nameForNewChat",
      type: "text",
      class: "input",
      currentPage: "commonPage",
    });
    super({
      ...props,
      children: {
        InputWithLabelChatName,
        ImageAvatar: new Image({
          image:
            "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig",
          class: "round-img",
          alt: "Пользователь",
        }),
        InputAvatar: new Input({
          id: "avatar",
          type: "file",
          name: "avatar",
          class: "input",
          value: "",
          placeholder: "",
          events: {
            change: async (e: Event) => {
              globalClass.changePicture(e, "round-img");
            },
          },
        }),
        ButtonOk: new Button({
          text: "Создать",
          id: "createChatConfirm",
          class: "mini-button",
          type: "button",
          events: {
            click: () => {
              this.createChat();
            },
          },
        }),
        ButtonCancel: new Button({
          text: "Отмена",
          id: "cancelCreateChat",
          class: "mini-button",
          type: "button",
          events: {
            click: () => {
              this.hide();
            },
          },
        }),
      },
    });
  }

  public show(): void {
    this.visible = true;
    this.setProps({
      visible: true,
    } as DialogProps);
  }

  public hide(): void {
    this.visible = false;
    this.setProps({
      visible: false,
    } as DialogProps);
  }

  private async createChat(): Promise<void> {
    this.pageController = new CommonPageController();
    if (await this.pageController.createChat()) {
      this.hide();
    }
  }

  componentDidUpdate() {
    return true;
  }

  override render(): string {
    const visibleClass = this.props.visible
      ? "dialog-visible"
      : "dialog-hidden";
    return /*html*/ `<div class="dialog-overlay ${visibleClass}">
                        <div class="dialog-content">   
                            <form>
                            {{{ ImageAvatar }}}
                            {{{ InputAvatar }}}
                            </form>
                            {{{InputWithLabelChatName}}} 
                            {{{ButtonOk}}}
                            {{{ButtonCancel}}}
                        </div>
                    </div>`;
  }
}
