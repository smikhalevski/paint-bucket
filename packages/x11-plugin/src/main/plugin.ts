import {Color} from '@paint-bucket/core';
import {x11Map} from './x11Map';
import {createRgb, intToRgb, RGB} from '@paint-bucket/rgb';

declare module '@paint-bucket/core/lib/Color' {

  interface IColorFactory {

    /**
     * Creates a new color using its X11 name.
     *
     * @see {@link https://en.wikipedia.org/wiki/X11_color_names X11 color names}
     * @param name The case-insensitive color name.
     */
    (name: string): Color;
  }
}

Color.extendFactory((factory) => (args) => {
  const [name] = args;

  if (typeof name === 'string') {
    const rgb = x11Map.get(name.toLowerCase());

    if (rgb) {
      return Color.create(RGB, intToRgb(rgb, createRgb()));
    }
  }

  return factory(args);
});
