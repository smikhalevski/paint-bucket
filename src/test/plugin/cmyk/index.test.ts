import { Color } from '../../../main/core';
import cmykPlugin from '../../../main/plugin/cmyk';

cmykPlugin(Color);

describe('cmyk', () => {
  test('returns cyan color component', () => {
    expect(new Color().cmyk([50]).cyan()).toBe(50);
  });

  test('sets cyan color component', () => {
    expect(new Color().cyan(50).cyan()).toBe(50);
  });

  test('mutates hue color component', () => {
    expect(
      new Color()
        .cmyk([30])
        .cyan(C => C * 2)
        .cyan()
    ).toBe(60);
  });
});
