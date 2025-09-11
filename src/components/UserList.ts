import Block, { BlockProps } from "../framework/Block";
import { UserPoint } from "./UserPoint";

interface UserListProps extends BlockProps {
  id: string;
  userList: UserPoint[];
}

export class UserList extends Block {
  constructor(props: UserListProps) {
    super({
      lists: props.userList || [],
      attr: {
        id: props.id,
      },
    });
  }

  public updateUserList(newUserList: UserPoint[]): void {
    this.setProps({
      ...this.props,
      userList: newUserList,
    } as UserListProps);
  }

  protected componentDidUpdate(
    oldProps: UserListProps,
    newProps: UserListProps
  ): boolean {
    if (oldProps.userList !== newProps.userList) {
      this.lists = { lists: newProps.userList };
      return true;
    }

    return false;
  }

  override render(): string {
    return `<datalist>  
           {{{ lists }}}
           </datalist>`;
  }
}
