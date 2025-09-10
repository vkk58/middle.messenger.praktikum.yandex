import Block, { BlockProps } from "../framework/Block";

export interface UserPointProps extends BlockProps {
  value: string;
  id: string;
}

export class UserPoint extends Block {
  constructor(props: UserPointProps) {
    super({
      attr: {
        id: props.id,
        value: props.value,
      },
    });
  }

  override render(): string {
    return "<option>";
  }
}
