import { ColorConstructor, RGB } from '@paint-bucket/core';
import { enhanceParse } from '@paint-bucket/plugin-utils';
import { x11Components } from './x11-components';

declare module '@paint-bucket/core' {
  interface ColorLikeSource {
    /**
     * Creates a new color using its [X11 color name](https://en.wikipedia.org/wiki/X11_color_names).
     *
     * ```ts
     * Color.parse('royalblue');
     * ```
     */
    '@paint-bucket/x11-plugin': string;
  }
}

export default function (Color: ColorConstructor): void {
  enhanceParse(Color, parse => value => {
    if (typeof value !== 'string') {
      return parse(value);
    }

    const components = x11Components.get(value.trim().toLowerCase());

    if (components !== undefined) {
      return new Color(RGB, components.slice(0));
    }
    return parse(value);
  });
}
