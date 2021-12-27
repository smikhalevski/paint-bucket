import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '../main';

describe('plugin', () => {

  test('creates color by X11 name', (done) => {
    color({R: 0xFA, G: 0x80 B: 0x72});
  });
});
