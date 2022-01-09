# Paint Bucket 🪣 [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

Highly performant and extensible color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '@paint-bucket/difference-plugin';

// or import all plugins at once using
// import {color} from 'paint-bucket';

color('#abcdef').saturation((S) => S / 2).red(); // → 188
```

# Plugins

## Create a plugin

You can extend Paint Bucket in 3 ways: add custom value parser, add static methods to `color()` and add prototype
methods to `Color`.

### Adding custom parser

```ts
// ./my-plugin.ts
import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    (keyword: 'background' | 'text'): Color;
  }
}

Color.overrideParser((next) => (value) => {
  if (value === 'background') {
    return new Color(Rgb, [1, 1, 1, 1]); // white
  }
  if (value === 'text') {
    return new Color(Rgb, [0, 0, 0, 1]); // black
  }
  return next(value);
});
```

Now lets see this parser in action:

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/css-plugin';
import './my-plugin.ts';

color('background').css(); // #ffffff
```

### Adding custom static method

```ts
// ./my-plugin.ts
import {Color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    keyword(keyword: 'background' | 'text'): Color;
  }
}

color.keyword = function (this: Color, keyword) {
  this.use(Rgb).rgb(keyword === 'background' ? [255, 255, 255, 1] : [0, 0, 0, 1]);
  return this;
};
```

Now lets see this static method in action:

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/css-plugin';
import './my-plugin.ts';

color.keyword('background').css(); // #ffffff
```

### Adding custom method

```ts
// ./my-plugin.ts

import {Color} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    lighten(amount: number): Color;
  }
}

Color.prototype.lighten = function (this: Color, amount) {
  const hsl = this.use(Hsl); // [H, S, L, a]
  hsl[2] = Math.max(0, Math.min(hsl[2] * amount, 1));
  return this;
};
```

Now lets see this method in action:

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import './my-plugin.ts';

color([182, 90, 16]).lighten(0.5).rgb();
```

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance testsuite.

Results are in millions of operations per second. The higher number is better.

|  | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
| --- | ---: | ---: | ---: | 
| Create | 13.61 | 3.35 | 1.36 |
| Desaturate | 6.53 | 0.72 | 0.51 |
| Spin + Lighten | 4.18 | 0.39 | — |

# ❤️

I cannot overestimate how much these libraries helped me to implement color model conversion algorithms:

- [@jonathantneal/convert-colors](https://github.com/jonathantneal/convert-colors)
- [@colorjs/color-space](https://github.com/colorjs/color-space)
