/**
 * X11 color name parsing plugin.
 *
 * ```ts
 * import { clr } from 'paint-bucket/core';
 * import 'paint-bucket/core/x11';
 *
 * clr('yellow');
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

const nextParse = Color.parse;

Color.parse = value => {
  if (typeof value !== 'string') {
    return nextParse(value);
  }

  const components = x11Components.get(value.trim().toLowerCase());

  if (components !== undefined) {
    return new Color(RGB, components.slice(0));
  }
  return nextParse(value);
};
