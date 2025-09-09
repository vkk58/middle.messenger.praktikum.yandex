import { chatAPI } from '../../api/ChatApi';
import { TextMessage } from '../../components/TextMessage';
import { IChat } from '../../types';

export class ChatsStore {
  private static instance: ChatsStore;

  private _messages: TextMessage[];

  public static getInstance(): ChatsStore {
    if (!ChatsStore.instance) {
      ChatsStore.instance = new ChatsStore();
    }
    return ChatsStore.instance;
  }

  get messages(): TextMessage[] {
    return this._messages;
  }

  set messages(value: TextMessage[]) {
    this._messages = value;
  }

  public addMessage(message: TextMessage): void {
    this.messages.push(message);
  }

  public clearMessages(): void {
    this.messages = [];
  }
}
