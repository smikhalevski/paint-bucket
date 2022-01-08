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

color('#aaa').grayscale().delta(0xAA_BB_CC); // → 12.9222
```

I cannot overestimate how much these libraries helped me to implement color model conversion algorithms:

- [@jonathantneal/convert-colors](https://github.com/jonathantneal/convert-colors)
- [@colorjs/color-space](https://github.com/colorjs/color-space)
