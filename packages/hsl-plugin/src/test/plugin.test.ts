import { Color } from '@paint-bucket/core';
import '../main';

describe('hue', () => {
  test('returns hue color component', () => {
    expect(new Color().hsl([810]).hue()).toBe(90);
  });

  test('sets hue color component', () => {
    expect(new Color().hue(720).hue()).toBe(360);
  });

  test('mutates hue color component', () => {
    expect(
      new Color()
        .hsl([90])
        .hue(H => H * 2)
        .hue()
    ).toBe(180);
  });
});
