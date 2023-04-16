# Paint Bucket [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

<a href="#readme">
  <img alt="Red paint" src="./images/paint.png"/>
</a>

[Highly performant](#performance), [extensible](#plugins), and
[tiny](https://bundlephobia.com/package/paint-bucket) color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

🪣 [API documentation is available here.](https://smikhalevski.github.io/paint-bucket/classes/core_src_main.Color.html)

```ts
import { Color } from 'paint-bucket';

// or cherry-pick plugins to reduce bundle size
// 
// import rgbPlugin from '@paint-bucket/rgb-plugin';
// import hslPlugin from '@paint-bucket/hsl-plugin';
// import cssPlugin from '@paint-bucket/css-plugin';
//
// Color.applyPlugins(rgbPlugin, hslPlugin, cssPlugin);

Color.parse('#abcdef').saturation(S => S / 2).red(); // ⮕ 188
```

Most methods provide getter-setter semantics:

```ts
// Set
Color.parse('#f00').red(127.5); // ⮕ Color instance
// or
Color.parse('#f00').red(R => R / 2); // ⮕ Color instance

// Get
Color.parse('#f00').red(); // ⮕ 255
```

Mutate multiple components at the same time:

```ts
Color.parse([64, 128, 0])
        .rgb(([R, G, B, a]) => [R * 3, G * 2, B, a])
    .rgb();
// ⮕ [192, 255, 0, 1]
```

`color` returns a mutable instance of `Color`. To create a copy of the `Color` instance you can use one of these
approaches:

```ts
const color1 = Color.parse('#f00');

// color2 is a copy of color1
const color2 = Color.parse(color1);
// or
const color3 = color1.clone();
```

Parse and serialize CSS color strings:

```ts
Color.parse('pink').css(); // ⮕ "#ffc0cb"

Color.parse('rgba(255, 192, 203)').css(); // ⮕ "#ffc0cb"
```

Create gradients and obtain color at arbitrary position:

```ts
Color.parse('red').gradient('blue').at(0.70).css(); // ⮕ "#4d00b3"
```

Create multi-stop gradients:

```ts
color
    .gradient(['red', 'pink', 'blue'], [0, 0.5, 1])
    .at(0.70)
    .css();
// ⮕ "#9973e0"
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
import { ColorModel, RGB } from '@paint-bucket/core';

const CMYK: ColorModel = {
  name: 'CMYK',

  // The number of color components that this model uses:
  // cyan, magenta, yellow, black, and alpha 
  componentCount: 5,

  componentsToRGB(components: readonly number[], rgb: RGB): void {
    // Update elements of the rgb array
  },
  convertRGBToComponents(rgb: Readonly<RGB>, components: number[]): void {
    // Update elements of the components array
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

[@csstools/convert-colors](https://github.com/jonathantneal/convert-colors)
and [color-space](https://github.com/colorjs/color-space) were used as a reference implementation of color model
conversion algorithms.

Color model converters expect component values to be in [0, 1] range. Plugin APIs may return component values in any
other range, but internally components are always normalized to [0, 1].

```ts
import { HSL } from '@paint-bucket/hsl';

const hsl: HSL = [
  1, // Hue
  0, // Saturation
  0, // Lightness
  1, // Alpha
];
```

When you create a new `Color` instance, it uses the RGB color model and corresponding components for the black color.

```ts
import { Color } from '@paint-bucket/core';

new Color(); // Opaque black RGB color
```

You can create a color with any model and components.

```ts
import { Color } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';

new Color(HSL, [0.5, 1, 0.5, 0.7]); // 70% transparent cyan HSL color
```

`Color` provides a mechanism to acquire color components in any color model via the `Color.getComponents` method.

```ts
import { Color, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';

new Color(HSL, [0.5, 1, 0.5, 0.7]).getComponents(RGB); // ⮕ [0, 1, 1, 0.7]
```

Here, we created a Color instance initialized with the components of the cyan color in the HSL color model and retrieved
components in the RGB color model.

`Color.getComponents` method returns read-only color components, which are computed on the fly. To update the color
components of the `Color` instance, you should useComponents the `Color.useComponents` method. This method returns a
writable array of components in a particular color model.

```ts
import { Color, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';

const color = new Color(HSL, [0.5, 1, 0.5, 0.5]); // cyan
const rgb = color.useComponents(RGB);

// Set blue component value to 0 
rgb[2] = 0;

color.getComponents(HSL); // ⮕ Green [0.333, 1, 0.5, 0.7]
```

# Plugins

Paint Bucket library relies on plugins in every aspect. The core package doesn't implement any color manipulation
functionality. Import a plugin (for example [`@paint-bucket/rgb-plugin`](./packages/rgb-plugin)) and pass it to
`Color.applyPlugins` method.

```ts
import { Color } from '@paint-bucket/core';
import rgbPlugin from '@paint-bucket/rgb-plugin';

Color.applyPlugins(rgbPlugin);

new Color().red(64).red(R => R * 2).red(); // ⮕ 128
```

Here's a list of plugins in this repo:

- [`@paint-bucket/rgb-plugin`](./packages/rgb-plugin) implements RGBa color model manipulation methods;
- [`@paint-bucket/hsl-plugin`](./packages/hsl-plugin) implements HSLa color model manipulation methods;
- [`@paint-bucket/gradient-plugin`](./packages/gradient-plugin) enables gradient manipulation;
- [`@paint-bucket/palette-plugin`](./packages/palette-plugin) creates various color palettes from the base color;
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
import { Color, ColorConstructor, RGB } from '@paint-bucket/core';

declare module '@paint-bucket/core' {
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

export default function(Color: ColorConstructor) {
  Color.prototype.getRed = function() {
    // Get read-only array of RGB color components where each component
    // is in [0, 1] range
    const rgb = this.getComponents(RGB);

    return rgb[0] * 255;
  };

  Color.prototype.setRed = function(value) {
    // Get writable array of RGB color components where each component
    // is in [0, 1] range
    const rgb = this.useComponents(RGB);

    // Update the red component
    rgb[0] = value / 255;

    // Return Color instance to allow chaining
    return this;
  };
}
```

To use this component we need to create a `Color` instance:

```ts
import { Color, RGB } from '@paint-bucket/core';
import plugin from './plugin1.ts';

Color.applyPlugins(plugin);

const color = new Color().setRed(128);

color.getComponents(RGB); // ⮕ [0.5, 0, 0, 1]
```

## Extend color parsing

Using `Color` constructor and initializing colors using arrays of components isn't the most convenient way, so
`@paint-bucket/core` exports a `color` function to streamline this process.

```ts
import { RGB } from '@paint-bucket/core';
import './plugin1.ts';

new Color().setRed(128).getComponents(RGB); // ⮕ [0.5, 0, 0, 1]
```

`color` function returns the `Color` instance. Using plugins, you can extend what arguments `color` function would
accept. Below is the example, how you can implement creating `Color` by its name.

```ts
// ./plugin2.ts

import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  // Merge declarations for the interface that the color function implements
  interface ColorParse {

    (name: 'pink' | 'cyan' | 'bisque'): Color;
  }
}

// Add the parsing middleware
Color._enhanceParser(next => name => {
  switch (name) {

    case 'pink':
      return new Color(RGB, [1, 0.7529, 0.7960, 1]); // #FFC0CB

    case 'cyan':
      return new Color(RGB, [0, 1, 1, 1]); // #00FFFF

    case 'bisque':
      return new Color(RGB, [1, 0.8941, 0.7686, 1]); // #FFE4C4
  }

  // If the name wasn't recognized then pass the argument to the next middleware
  return next(value);
});
```

Now we can use this plugin with the `color` function.

```ts
import { color, RGB } from '@paint-bucket/core';
import './plugin2.ts';

Color.parse('cyan').getComponents(RGB); // ⮕ [0, 1, 1, 1]
```

# Performance

Clone this repo and use `npm ci && npm run build && npm run perf` to run the performance testsuite.

Results are in millions of operations per second [^1]. The higher number is better.

|                                      | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
|--------------------------------------|-------------:|--------------------------------------------------:|----------------------------------------------:| 
| `Color([255, 255, 255])`             |        47.65 |                                              4.05 |                                          2.51 |
| `Color('#abc')`                      |        10.02 |                                              1.80 |                                          1.90 |
| `Color('#abcdef')`                   |         9.54 |                                              1.86 |                                          2.24 |
| `Color('#abcdefff')`                 |         9.14 |                                              1.82 |                                          1.96 |
| `Color(0xab_cd_ef)`                  |         6.30 |                                                 — |                                          3.90 |
| `Color.rgb32(0xab_cd_ef_ff)`         |         6.31 |                                                 — |                                             — |
| `Color('rgba(128, 128, 128, 0.5)')`  |         2.69 |                                              1.66 |                                          0.24 |
| `c.saturation(50).rgb()` [^2]        |        22.96 |                                              0.95 |                                          1.04 |
| `c.hue(90).lightness(10).rgb()` [^2] |        17.71 |                                              0.65 |                                             — |
| `Color.gradient(['#fff', '#000'])`   |         5.02 |                                                 — |                                          0.52 |
| `g.at(0.5, RGB, lerp)` [^3]          |        13.95 |                                                 — |                                          4.86 |
| `g.at(0.5, LAB, csplineMonot)` [^3]  |        12.26 |                                                 — |                                          4.80 |

[^1]: Performance was measured on Apple M1 Max using [TooFast](https://github.com/smikhalevski/toofast).

[^2]: `c` is the `Color` instance.

[^3]: `g` is the `Gradient` instance. [`lerp`](https://github.com/smikhalevski/algomatic/#lerp) and
[`csplineMonot`](https://github.com/smikhalevski/algomatic/#csplinemonot) are linear and monotonous cubic spline
interpolation factories respectively from [Algomatic](https://github.com/smikhalevski/algomatic).
