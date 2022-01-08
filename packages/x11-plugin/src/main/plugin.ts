import {Color, Rgb} from '@paint-bucket/core';
import {x11Components} from './x11-components';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    /**
     * Creates a new color using its [X11 color name](https://en.wikipedia.org/wiki/X11_color_names).
     *
     * @param name The case-insensitive color name.
     * @return The new {@link Color} instance.
     */
    (name: string): Color;
  }
}

Color.overrideParser((next) => (value) => {
  if (typeof value === 'string') {
    const components = x11Components.get(value.toLowerCase());

    if (components) {
      return new Color(Rgb, components.slice(0));
    }
  }
  return next(value);
});
