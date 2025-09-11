import { chatAPI } from '../api/ChatApi';
import Block, { BlockProps } from '../framework/Block';
import CommonPageController from '../pages/commonPage/CommonPageController';
import { Button } from './Button';
import { InputWithLabel } from './InputWithLabel';
import { UserList } from './UserList';
import { UserPoint } from './UserPoint';

interface DialogDeleteUserProps extends BlockProps {
  class?: string;
  visible?: boolean;
}

export class DialogDeleteUser extends Block {
  public visible: boolean;

  private CurrentUserListComponent: UserList;

  constructor(props: DialogDeleteUserProps) {
    debugger;
    const CurrentUserListComponent = new UserList({
      id: 'currentuser-list',
      userList: [],
    });
    super({
      ...props,
      children: {
        CurrentUserListComponent,
        InputDeleteUserFromChat: new InputWithLabel({
          text: 'Выбор пользователя',
          name: 'chooseUserForDelete',
          type: 'text',
          class: 'input',
          currentPage: 'commonPage',
          list: 'currentuser-list',
        }),
        ButtonDeleteUserFromChat: new Button({
          text: 'Удалить',
          id: 'deleteUserFromChatChat',
          class: 'mini-button-add-user',
          type: 'button',
          events: {
            click: () => {
              const elSearch = document.getElementById(
                'chooseUserForDelete',
              ) as HTMLInputElement;
              const searchedUserId =
                CommonPageController.getInstance().searchUserList[
                  elSearch.value
                ];
              if (searchedUserId) {
                chatAPI
                  .deleteUserFromChat(
                    [searchedUserId],
                    CommonPageController.getInstance().chatId,
                  )
                  .then(() => {
                    alert(`Пользователь ${elSearch.value} удален`);
                    this.hide();
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            },
          },
        }),
        ButtonCancelDeleteUser: new Button({
          text: 'Отмена',
          id: 'cancelDeleteUserFromChatChat',
          class: 'mini-button-add-user',
          type: 'button',
          events: {
            click: () => {
              this.hide();
            },
          },
        }),
      },
    });

    this.CurrentUserListComponent = CurrentUserListComponent;
  }

  public show(): void {
    this.visible = true;
    this.setProps({
      visible: true,
    } as DialogDeleteUserProps);
  }

  public hide(): void {
    this.visible = false;
    this.setProps({
      visible: false,
    } as DialogDeleteUserProps);
  }

  componentDidUpdate() {
    return true;
  }

  public updateUserList(userList: UserPoint[]) {
    this.CurrentUserListComponent.updateUserList(userList);
  }

  override render(): string {
    const visibleClass = this.props.visible
      ? 'dialog-visible'
      : 'dialog-hidden';
    return /*html*/ `<div class="dialog-overlay ${visibleClass}">
                        <div class="dialog-content">   
                        <div>
                        {{{ InputDeleteUserFromChat }}}
                        {{{CurrentUserListComponent}}}
                        {{{ButtonDeleteUserFromChat}}}
                        {{{ButtonCancelDeleteUser}}}
                        </div>
                        </div>
                    </div>`;
  }
}
