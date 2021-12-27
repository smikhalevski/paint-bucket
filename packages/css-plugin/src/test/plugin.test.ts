import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '../main';

describe('plugin', () => {

  test('creates color from CSS representation', () => {
    expect(color('#abc').toRgbInt()).toBe(0xAA_BB_CC_FF);
  });
});
