---
date: '2024-05-14'
title: 'Absolute Paths with React and Webpack'
tags: [ 'webpack', 'react']
slug: absolute-paths
featuredImage: code-img.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "Starting a new repository is always challenging, even with templates. If you are working with Webpack and Typescript, here's how you can clearly establish absolute paths."
---

import H2 from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import BetterImageModal from 'components/BetterImageModal';
import CompBox from 'components/CompBox';


<CompBox techItems={["Webpack 5", "Node 18","React 18", "TypeScript 5"]} />

<H2>Relative Paths are Confusing</H2>

How many directories deep is the component you are working with? If your code is littered with `import` paths like this, you are defiinitely looking for relief.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx

import { useSiteMetadata } from '../hooks/use-site-metadata';
import CalendarIcon from '../../assets/calendar.svg';
import DoubleChevronArrow from '../../assets/double-chevron.svg';
import '../../../../ArtElement.scss';


```
</CodeSection>

This is definitely not a one size fits all solution, but it's worth documenting since I often start with a fresh repository or I am using a new version of X component, and I need to know how to get my absolute paths back.


<H2>Typescript Settings</H2>

The first item is to add a `baseUrl` setting for your root directory, which in this case is `src`. You must also list `src` as an `include`.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "target": "es6",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "baseUrl": "src"
  },
  "include": ["src", ".d.ts"]
}


```
</CodeSection>




<H2>Webpack Settings</H2>

I'm always tricked into thinking this is all I need, but when I start the Webpack development server, I get a nasty error message that it cannot find my component. So now we must go into `webpack.config.ts` and make sure we account for it here.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```ts
// webpack.config.ts
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
  },

```
</CodeSection>

That should be it. From now on you are free to add components with wonderful absolute paths like so:


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
import React from 'react';
import MapTest from 'components/MapTest';


```
</CodeSection>

