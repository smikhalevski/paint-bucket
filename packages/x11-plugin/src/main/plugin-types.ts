import { Color } from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {
  interface ColorParse {
    /**
     * Creates a new color using its [X11 color name](https://en.wikipedia.org/wiki/X11_color_names).
     *
     * @param name The case-insensitive color name.
     * @return The new {@link Color} instance.
     */
    (name: string): Color;
  }
}
