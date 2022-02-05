# Paint Bucket 🪣 [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

[Highly performant](#performance), [extensible](#plugins), and
[tiny](https://bundlephobia.com/package/paint-bucket) color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

📚 [API documentation is available here.](https://smikhalevski.github.io/paint-bucket/classes/core_src_main.Color.html)

```ts
import {color} from 'paint-bucket';

// or cherry-pick plugins to reduce bundle size
// import '@paint-bucket/rgb-plugin';
// import '@paint-bucket/hsl-plugin';
// import '@paint-bucket/css-plugin';
// import {color} from '@paint-bucket/core';

color('#abcdef').saturation((S) => S / 2).red(); // → 188
```

Most methods provide getter-setter semantics:

```ts
// Set
color('#f00').red(127.5); // → Color instance
// or
color('#f00').red((R) => R / 2); // → Color instance

// Get
color('#f00').red(); // → 255
```

Mutate multiple components at the same time:

```ts
color([64, 128, 0])
    .rgb(([R, G, B, a]) => [R * 3, G * 2, B, a])
    .rgb();
// → [192, 255, 0, 1]
```

`color` returns a mutable instance of `Color`. To create a copy of the `Color` instance you can use one of these
approaches:

```ts
const color1 = color('#f00');

// color2 is a copy of color1
const color2 = color(color1);
// or
const color3 = color1.clone();
```

Parse and serialize CSS color strings:

```ts
color('pink').css(); // → "#ffc0cb"

color('rgba(255, 192, 203)').css(); // → "#ffc0cb"
```

Create gradients and obtain color at arbitrary position:

```ts
color('red').gradient('blue').at(0.70).css(); // → "#4d00b3"
```

Create multi-stop gradients:

```ts
color
    .gradient(['red', 'pink', 'blue'], [0, 0.5, 1])
    .at(0.70)
    .css();
// → "#9973e0"
```

# Concepts

Color manipulation isn't possible without the color model concept.

> [Color model](https://en.wikipedia.org/wiki/Color_model) is an abstract mathematical model describing the way colors
> can be represented as tuples of numbers (aka color components).

There's a large variety of color models aimed for different purposes. Different color models define different color
components. For example, RGB color model defines three color components: red, green and blue; while HSL defines hue,
saturation and lightness color components. One color model can be converted to the other.

> [Color space](https://en.wikipedia.org/wiki/Color_space) defines how color components of the particular color model
> are serialized.

For example, RGB color model can be represented as Adobe RGB or sRGB color space.

Paint Bucket provides an abstraction for color models which are represented as objects that define methods to convert
color components between color model representation and RGB. Color components are an array of numbers.

```ts
import {ColorModel} from '@paint-bucket/core';

const Cmyk: ColorModel = {

  componentsToRgb(components: readonly number[], rgb: number[]): void {
    // Update items of the rgb array here
  },
  rgbToComponents(rgb: readonly number[], components: number[]): void {
    // Update items of the components array here
  },
};
```

Since color models are pluggable, they reside in separate packages:

- [`@paint-bucket/hsl`](./packages/hsl) for [HSL color model](https://en.wikipedia.org/wiki/HSL_and_HSV);
- [`@paint-bucket/hsv`](./packages/hsv) for [HSV color model](https://en.wikipedia.org/wiki/HSL_and_HSV);
- [`@paint-bucket/lab`](./packages/lab)
  for [CIE-L\*a\*b\* color model](https://en.wikipedia.org/wiki/CIELAB_color_space);
- [`@paint-bucket/xyz`](./packages/xyz)
  for [CIE 1931 XYZ color model](https://en.wikipedia.org/wiki/CIE_1931_color_space);

RGB color model is defined in [`@paint-bucket/core`](./packages/core).

Color model converters expect component values to be in [0, 1] range. Plugin APIs may return component values in any
other range, but internally components are always normalized to [0, 1].

```ts
import {Hsl} from '@paint-bucket/hsl';

const hsl: Hsl = [
  1, // Hue
  0, // Saturation
  0, // Lightness
  1, // Alpha
];
```

When you create a new `Color` instance, it uses the RGB color model and corresponding components for the black color.

```ts
import {Color} from '@paint-bucket/core';

new Color(); // Opaque black RGB color
```

You can create a color with any model and components.

```ts
import {Color} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

new Color(Hsl, [0.5, 1, 0.5, 0.7]); // 70% transparent cyan HSL color
```

`Color` provides a mechanism to acquire color components in any color model via the `Color.get` method.

```ts
import {Color, Rgb} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

new Color(Hsl, [0.5, 1, 0.5, 0.7]).get(Rgb); // → [0, 1, 1, 0.7]
```

Here, we created a Color instance initialized with the components of the cyan color in the HSL color model and retrieved
components in the RGB color model.

`Color.get` method returns read-only color components, which are computed on the fly. To update the color components of
the `Color` instance, you should use the `Color.use` method. This method returns a writable array of components in a
particular color model.

```ts
import {Color, Rgb} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

const color = new Color(Hsl, [0.5, 1, 0.5, 0.5]); // Cyan
const rgb = color.use(Rgb);

// Set blue component value to 0 
rgb[2] = 0;

color.get(Hsl); // → Green [0.333, 1, 0.5, 0.7]
```

# Plugins

Paint Bucket library relies on plugins in every aspect. The core package doesn't implement any color manipulation
functionality. When you import a plugin package (for example [`@paint-bucket/rgb-plugin`](./packages/rgb-plugin))
`Color` class prototype is automatically enriched with new functionality.

```ts
import '@paint-bucket/rgb-plugin';
import {Color} from '@paint-bucket/core';

new Color().red(64).red((R) => R * 2).red(); // → 128
```

Here's a list of plugins in this repo:

- [`@paint-bucket/rgb-plugin`](./packages/rgb-plugin) implements RGBa color model manipulation methods;
- [`@paint-bucket/hsl-plugin`](./packages/hsl-plugin) implements HSLa color model manipulation methods;
- [`@paint-bucket/gradient-plugin`](./packages/gradient-plugin) enables gradient manipulation;
- [`@paint-bucket/difference-plugin`](./packages/difference-plugin) provides
  [color difference](https://en.wikipedia.org/wiki/Color_difference) computation methods;
- [`@paint-bucket/css-plugin`](./packages/css-plugin) enables `color` function to parse CSS color strings;
- [`@paint-bucket/x11-plugin`](./packages/x11-plugin) enables `color` to recognize
  [X11 color names](https://en.wikipedia.org/wiki/X11_color_names).

## Extend color instance

Below is an example that shows how to extend the `Color` prototype to implement a color component read and write
methods.

```ts
// ./plugin1.ts

import {Color, Rgb} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    /**
     * @returns The red color component in range [0, 255]
     */
    getRed(): number;

    /**
     * Sets the red color component.
     *
     * @param R The red color component in range [0, 255]
     */
    setRed(value: number): Color;
  }
}

Color.prototype.getRed = function (this: Color) {

  // Get read-only array of RGB color components where each component
  // is in [0, 1] range
  const rgb = this.get(Rgb);

  return rgb[0] * 255;
};

Color.prototype.setRed = function (this: Color, value) {

  // Get writable array of RGB color components where each component
  // is in [0, 1] range
  const rgb = this.use(Rgb);

  // Update the red component
  rgb[0] = value / 255;

  // Return Color instance to allow chaining
  return this;
};
```

To use this component we need to create a `Color` instance:

```ts
import {Color, Rgb} from '@paint-bucket/core';
import './plugin1.ts';

const color = new Color().setRed(128);

color.get(Rgb); // → [1, 0, 0, 1]
```

## Extend color parsing

Using `Color` constructor and initializing colors using arrays of components isn't the most convenient way, so
`@paint-bucket/core` exports a `color` function to streamline this process.

```ts
import {color, Rgb} from '@paint-bucket/core';
import './plugin1.ts';

color().setRed(128).get(Rgb); // → [1, 0, 0, 1]
```

`color` function returns the `Color` instance. Using plugins, you can extend what arguments `color` function would
accept. Below is the example, how you can implement creating `Color` by its name.

```ts
// ./plugin2.ts

import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  // Merge declarations for the interface that the color function implements
  interface ColorFunction {

    (name: 'pink' | 'cyan' | 'bisque'): Color;
  }
}

// Add the parsing middleware
Color.overrideParser((next) => (name) => {
  switch (name) {

    case 'pink':
      return new Color(Rgb, [1, 0.7529, 0.7960, 1]); // #FFC0CB

    case 'cyan':
      return new Color(Rgb, [0, 1, 1, 1]); // #00FFFF

    case 'bisque':
      return new Color(Rgb, [1, 0.8941, 0.7686, 1]); // #FFE4C4
  }

  // If the name wasn't recognized then pass the argument to the next middleware
  // (if awailable) or to the default parser implementation
  return next(value);
});
```

Now we can use this plugin with the `color` function.

```ts
import {color, Rgb} from '@paint-bucket/core';
import './plugin2.ts';

color('cyan').get(Rgb); // → [0, 1, 1, 1]
```

# Performance

Clone this repo and use `npm ci && npm run build && npm run perf` to run the performance testsuite.

Results are in millions of operations per second. The higher number is better.

|  | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
| --- | ---: | ---: | ---: | 
| `color([255, 255, 255])` | 12.61 | 3.35 | 1.45 |
| `color('#abc')` | 5.59 | 0.98 | 0.86 |
| `color('#abcdef')` | 5.50 | 0.99 | 0.96 |
| `color('#abcdefff')` | 4.97 | 0.97 | 0.86 |
| `color(0xAB_CD_EF)` | 9.92 | 5.87 | 1.61 |
| `color('rgba(128, 128, 128, 0.5)')` | 1.70 | 0.89 | 0.09 |
| `c.saturation(50).rgb()` † | 7.35 | 0.81 | 0.66 |
| `c.hue(90).lightness(10).rgb()` † | 7.28 | 0.41 | — |
| `color.gradient(['#fff', '#000'])` | 3.08 | — | 0.26 |
| `g.at(0.5, Rgb, lerp)` ‡ | 8.45 | — | 2.49 |
| `g.at(0.5, Lab, csplineMonot)` ‡ | 7.38 | — | 2.57 |

† Variable `c` holds the `Color` instance.

‡ Variable `g` holds the `Gradient` instance. [`lerp`](https://github.com/smikhalevski/numeric-wrench/#lerp)
and [`csplineMonot`](https://github.com/smikhalevski/numeric-wrench/#csplinemonot) are linear and monotonous cubic
spline interpolation factories respectively.

# ❤️

I cannot overestimate how much [@jonathantneal/convert-colors](https://github.com/jonathantneal/convert-colors) and
[@colorjs/color-space](https://github.com/colorjs/color-space) helped me to implement color model conversion algorithms.
