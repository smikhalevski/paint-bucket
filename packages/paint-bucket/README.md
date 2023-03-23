# paint-bucket

Highly performant, extensible, and tiny color manipulation library.

This package is a shortcut to install all plugins for [Paint Bucket](https://github.com/smikhalevski/paint-bucket/).

# Usage

```ts
import {color} from 'paint-bucket';

Color.parse('#abcdef').saturation((S) => S / 2).red(); // ⮕ 188
```
