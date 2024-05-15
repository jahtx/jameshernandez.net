---
date: '2023-12-18'
title: 'Using Bootstrap 5 with React'
tags: ['bootstrap', 'scss', 'css', 'gatsby', 'react']
slug: bootstrap-react
featuredImage: bs.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "As a designer, I intially didn't like the idea of using a CSS framework, it appeared to be a lazy way of creating an interface. But just because you start with Bootstrap or Material doesn't mean you can't do customization along the way and create innovative experiences."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import BetterImageModal from 'components/BetterImageModal';
import BlueBox from './blue-box.jpg';
import CompBox from 'components/CompBox';

<CompBox techItems={["Bootstrap 5", "Node 18", "React 18", "Gatsby 5"]} />

<H2ThemeWrapper>Installing Bootstrap 5</H2ThemeWrapper>

You can install on your React project with `npm install bootstrap@5`.

I normally recommend using the [customization feature](https://getbootstrap.com/docs/5.0/customize/sass/), so I would have a SCSS folder where you include a file called `bootstrap-custom.scss` and include the features you want (this is important, as sometimes the entire Boostrap library can be included on every page.) As always, import the Bootstrap file to your main component.

<CodeSection darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
@import 'styles/dominant/bootstrap-custom.scss';
```
</CodeSection>

<H2ThemeWrapper>BreakPoints</H2ThemeWrapper>

The most useful feature is its breakpoint functions. While creating responsive designs, your CSS files could be littered with 
breakpoint code like `@media only screen and (min-width: 768px) and (max-width: 959px)`. Unfortunately, if you have several developers, you could find each developer using different breakpoints, which makes debugging CSS a lot harder for your testers.

Bootstrap immediately gives you six default breakpoints. The good news is you can customize them with the source Sass files like so:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```
</CodeSection>

The next time you want to separate out CSS responsively, just use Bootstraps `@include` functions throughout the entire project.

<CodeSection darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
.homemade-container-sm {
  padding: 0 12px;
  @include media-breakpoint-up(sm) {
    max-width: 540px;
  }
  @include media-breakpoint-up(md) {
    max-width: 720px;
  }
  @include media-breakpoint-up(lg) {
    max-width: 960px;
  }
  @include media-breakpoint-up(xl) {
    max-width: 1140px;
  }
  @include media-breakpoint-up(xxl) {
    max-width: 1320px;
  }
}
```
</CodeSection>

<H2ThemeWrapper>Creating Easy Flexboxes</H2ThemeWrapper>

Wireframing in Figma or Sketch is great, but what if you can create the skeleton in real HTML and throw real functionality in later?

<BetterImageModal 
imageUrlFromFolder={BlueBox}
title="Image Library"
initialSize="30rem"
frameStyles="p-3"
modalSize='xl'
preventShow
modalImageSize="xlargeImageModal"
/>
<CodeSection darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```html
<div className="mt-5">
  <div className="border border-5 d-flex w-75 justify-content-center">
    <div className="m-2" style={blueBox}></div>
  </div>
</div>
```
 </CodeSection>

 So with the sample code here, I used `border` and `border-5` to construct a quick border box and `w-75` to extend it to 75% of its parent container and `d-flex` and `justify-content-center` to center whatever content vertically. 

<H2ThemeWrapper>Built-in Colors</H2ThemeWrapper>

This is something easy, but I can't tell you how relieving it is to know these are automatically in my CSS arsenel. The ability to just throw around `$gray-800` or `$blue` is quite nice. It also reminds you to standardize your functional color-coding.

<CodeSection height='10' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
$blue: #0d6efd;
$indigo: #6610f2;
$purple: #6f42c1;
$pink: #d63384;
$red: #dc3545;
$orange: #fd7e14;
$yellow: #ffc107;
$green: #198754;
$teal: #20c997;
$cyan: #0dcaf0;

// greys
$white: #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black: #000;

// functional-color-coding
$primary: $blue;
$secondary: $gray-600;
$success: $green;
$info: $cyan;
$warning: $yellow;
$danger: $red;
$light: $gray-100;
$dark: $gray-900;
````
</CodeSection>

<H2ThemeWrapper>Bootstrap Utilities</H2ThemeWrapper>

Bootstrap's utilities also lets you creat multiple classes based on a give property, such as `opacity`. So the code below will create multiple classes `opacity-0` and `opacity-25` and so forth. 

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
$utilities: (
  "opacity": (
    property: opacity,
    values: (
      0: 0,
      25: .25,
      50: .5,
      75: .75,
      100: 1,
    )
  )
 );
 ```
</CodeSection>
