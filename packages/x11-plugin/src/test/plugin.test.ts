import {Color, color} from '@paint-bucket/core';
import {RGB} from '@paint-bucket/rgb';
import '../main';

describe('color', () => {

  test('creates color by X11 name', (done) => {
    (function (this: Color) {
      expect(this.forRead(RGB)).toEqual({R: 0, G: 255, B: 255, a: 1});
      done();
    }).call(color('cyan'));
  });
});
