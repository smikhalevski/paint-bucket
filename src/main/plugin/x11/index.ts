/**
 * X11 color name parsing plugin.
 *
 * ```ts
 * import { Color } from 'paint-bucket/core';
 * import x11Plugin from 'paint-bucket/plugin/x11';
 *
 * x11Plugin(Color);
 * ```
 *
 * @module plugin/x11
 */

import { Color } from '../../core';
import { RGB } from '../../rgb';
import { x11Components } from './x11-components';

declare module '../../core' {
  interface ColorLikeSource {
    /**
     * Creates a new color using its [X11 color name](https://en.wikipedia.org/wiki/X11_color_names).
     *
     * ```ts
     * clr('royalblue');
     * ```
     */
    'paint-bucket/plugin/x11': string;
  }
}

export default function x11Plugin(ctor: typeof Color): void {
  const nextParse = ctor.parse;

  ctor.parse = value => {
    if (typeof value !== 'string') {
      return nextParse(value);
    }

    const components = x11Components.get(value.trim().toLowerCase());

    if (components !== undefined) {
      return new ctor(RGB, components.slice(0));
    }
    return nextParse(value);
  };
}
