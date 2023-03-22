import { Color } from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '../main';

describe('plugin', () => {
  test('creates color from CSS representation', () => {
    expect(Color.parse('#abc').rgb32()).toBe(0xaa_bb_cc_ff);
  });
});

describe('css', () => {
  test('stringifies color as RGB', () => {
    expect(Color.parse('#abc').css()).toBe('#aabbcc');
  });

  test('sets color as RGB', () => {
    expect(new Color().css('#abc').css()).toBe('#aabbcc');
  });

  test('stringifies color as RGBa', () => {
    expect(Color.parse('#abc').alpha(0.5).css()).toBe('rgba(170,187,204,0.50)');
  });

  test('readme example', () => {
    expect(new Color().css('hsl(290, 20%, 50% / 80%)').css()).toBe('rgba(145,102,153,0.80)');
  });
});
