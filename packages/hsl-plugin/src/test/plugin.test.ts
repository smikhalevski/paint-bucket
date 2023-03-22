import { color } from '@paint-bucket/core';
import '../main';

describe('hue', () => {
  test('returns hue color component', () => {
    expect(color().hsl([810]).hue()).toBe(90);
  });

  test('sets hue color component', () => {
    expect(color().hue(720).hue()).toBe(360);
  });

  test('mutates hue color component', () => {
    expect(
      color()
        .hsl([90])
        .hue(H => H * 2)
        .hue()
    ).toBe(180);
  });
});
