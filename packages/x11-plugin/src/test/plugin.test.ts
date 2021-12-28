import {Color, color} from '@paint-bucket/core';
import {RGB} from '@paint-bucket/rgb';
import '../main';

describe('plugin', () => {

  test('creates color by X11 name', (done) => {
    (function (this: Color) {
      expect(this.get(RGB)).toEqual({R: 0, G: 1, B: 1, a: 1});
      done();
    }).call(color('cyan'));
  });
});
