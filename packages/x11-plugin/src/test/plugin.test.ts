import {Color, color, Rgb} from '@paint-bucket/core';
import '../main';

describe('plugin', () => {

  test('creates color by X11 name', (done) => {
    (function (this: Color) {
      expect(this.get(Rgb)).toEqual([0, 1, 1, 1]);
      done();
    }).call(color('cyan'));
  });
});
