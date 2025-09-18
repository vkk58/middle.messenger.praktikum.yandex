import { Text } from '../components/Text';
import Block from './Block';

describe('Block', () => {
  it('Создание', () => {
    const text = new Text({
      text: 'Test',
      class: 'errorDescriptionText',
    });
    expect(text).toBeInstanceOf(Block);
  });

  it('Получение контента', () => {
    const text = new Text({
      text: 'Test',
      class: 'test',
    });
    const content = text.getContent();
    expect(content.textContent).toEqual('Test');
  });
});
