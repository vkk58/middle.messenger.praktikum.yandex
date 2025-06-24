import Block from '../framework/Block';

export class ErrorMessage extends Block {
  constructor(message: string) {
    super({message: message})
    };

  override render(): string {
    return `<p class="error">{{message}}</p>`;
  }
}
