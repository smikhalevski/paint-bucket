/**
 * X11 color name parsing plugin.
 *
 * ```ts
 * import { Color } from 'paint-bucket/core';
 * import enableX11 from 'paint-bucket/plugin/x11';
 *
 * enableX11(Color);
 * ```
 *
 * @module paint-bucket/plugin/x11
 */

import { Color, RGB } from '../../core';
import { enhanceParse } from '../../utils';
import { x11Components } from './x11-components';

declare module '../../core' {
  interface ColorLikeSource {
    /**
     * Creates a new color using its [X11 color name](https://en.wikipedia.org/wiki/X11_color_names).
     *
     * ```ts
     * Color.parse('royalblue');
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/x11!}
     */
    'paint-bucket/plugin/x11': string;
  }
}

export default function (colorConstructor: typeof Color): void {
  enhanceParse(colorConstructor, parse => value => {
    if (typeof value !== 'string') {
      return parse(value);
    }

    const components = x11Components.get(value.trim().toLowerCase());

    if (components !== undefined) {
      return new colorConstructor(RGB, components.slice(0));
    }
    return parse(value);
  });
}
