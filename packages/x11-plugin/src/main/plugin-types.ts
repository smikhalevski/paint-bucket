import '@paint-bucket/core';

declare module '@paint-bucket/core' {
  interface InjectColorLike {
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
