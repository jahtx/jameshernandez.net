---
date: '2024-01-12'
title: 'Decrease the Size of Gatsby Builds'
tags: ['gatsby', 'css', 'react', 'svg', 'main']
slug: optimize-gatsby
featuredImage: gatsby.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: 'After finally getting a nice template together for Gatbsy, I realized every new post had a HTML file that was at least half a megabyte. This can multiply quickly, especially if you or your team add several new posts a week. The build of your site can easily approach a gigabyte given enough time. Here is how to keep your build sizes properly in check.'
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import CompBox from 'components/CompBox';


<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />

<H2ThemeWrapper>The big, bad discovery</H2ThemeWrapper>

I've been using Gastby for awhile since it requires nothing more than a static hosting service such as AWS S3. I put together about 20-30 sample blog posts and observed the build size noticably increase. Imagine my horror when I opened an HTML file to find this monstrocity:



<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```css
/*!
 * Bootstrap  v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 *//*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 *//*!
 * Bootstrap  v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
 ```
</CodeSection>
Good Lord! Gastby is not removing comments from the CSS! Oh, wait, is that the entire Bootstrap library in the header of JUST ONE of my HTML files?!

Ok, wait a bit, because it gets worse. I go through the rest and spot this:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```svg
<svg class="brand-logo" aria-labelledby="title" width="100%" height="100%" viewBox="0 0 2937 417" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2">
  <title id="title" lang="en">Turochamp</title>
    <g>
      <g>
        <g>
          <g>
            <path d="M399.56,121.748c-0.16,-0.247 -0.362,-0.449 -0.607,-0.607c-0.158,-0.247 -0.36,-0.449 -0.607,-0.606c-0.16,-0.249 -0.36,-0.45 -0.609,-0.607c-0.157,-0.247 -0.357,-0.449 -0.606,-0.609c-0.158,-0.245 -0.36,-0.447 -0.607,-0.605c-0.158,-0.249 -0.36,-0.449 -0.607,-0.606c-0.158,-0.247 -0.36,-0.45 -0.605,-0.609c-0.157,-0.245 -0.362,-0.447 -0.606,-0.605c-0.16,-0.247 -0.36,-0.449 -0.607" />[...]</svg>
```
</CodeSection>

That's the start of the SVG file of my logo! And that also is in each and every HTML file!

<H2ThemeWrapper>Rule #1: Don't use SVG files as your Logo or in your Navigation</H2ThemeWrapper>

Gatsby will build each page with all SVGs embedded in the HTML file, regardless of size. It doesn't sound that bad, until you realize your nifty logo could actually be 250KB as an SVG vector! As you know, on compile Gatsby will create each separate page of your site as its own HTML file, including all your paginated lists of blog posts! The advantages of SVG in this case may not be worth it.

Now, say that instead you use an image, like a PNG of a similar size instead of the same SVG. Now, Gatsby will use the same image file for every page, meaning that 250KB is only pushed up once, not 40 or 50 times. This lets your team plan for a site with many more posts and features without the overhead.

There is a downside. If you're using SVG for icons and changing their color to correspond to light/dark mode, this is likely more difficult to do with PNGs or GIFs. Luckily, most icons are not going to be that large.

<H2ThemeWrapper>Rule #2: Use only what you need from CSS frameworks like Bootstrap and Material UI</H2ThemeWrapper>

The first thing I install on a new site is Bootstrap. I was initially hesitant (as a professional, it seemed like a sure-fire way to create something cookie-cutter), but there are huge advantages to using its grid structure and components that have been structured already with accessibility in mind. I attached `bootstrap.scss` to my main SASS file, and it was ready to go!

I made the error in thinking only those styles I needed would be included in the build, and that a separate CSS files would be created and used as needed. _Ha! No, Gastby is not that nice yet!_

So one option is that if you're not using a particular feature, say the Dropdowns or the Forms, you can pull only those you need with a custom file, like so:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">

```scss
// Include parts of Bootstrap

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import '~bootstrap/scss/functions';

// 2. Include any default variable overrides here

// 3. Include remainder of required Bootstrap stylesheets (including any separate color mode stylesheets)
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/variables-dark';

// 4. Include any default map overrides here

// 5. Include remainder of required parts
@import '~bootstrap/scss/maps';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/root';

// 6. Optionally include any other parts as needed
@import '~bootstrap/scss/utilities';
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/type';
@import '~bootstrap/scss/containers';
@import '~bootstrap/scss/helpers';
@import '~bootstrap/scss/nav.scss';
// @import '~bootstrap/scss/dropdown.scss';
@import '~bootstrap/scss/navbar.scss';
@import '~bootstrap/scss/breadcrumb.scss';
// @import '~bootstrap/scss/forms.scss';
@import '~bootstrap/scss/buttons.scss';
@import '~bootstrap/scss/transitions.scss';

// 7. Optionally include utilities API last to generate classes based on the Sass map in `_utilities.scss`
@import '~bootstrap/scss/utilities/api';

// 8. Add additional custom code here
```

</CodeSection>

<br />
I had also considered you could just add the base file to the  `gatsby-browser.tsx` file, like so:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
import 'styles/packages/bootstrap/bootstrap.css';
```
</CodeSection>
<br />
Unfortunately, this still has the effect of pulling all the code into each HTML file. 🙁

Luckily, Gatsby allows you to link to a CSS file the old way, in the `<head>` tag.

First, we're going to use the Static folder, which as you know, puts all files into the main build directory, so we know those files are going to stay separate.

Then, if you're using the Gatsby Head component, you can place it in here like so:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">

```tsx{1-2,22}
import type { HeadFC } from 'gatsby';
import { SiteMetadata } from 'types/General';
import { useSiteMetadata } from 'hooks/use-site-metadata'; 

export const Head: HeadFC = () => {
  const {
    title,
    author,
    keywords,
    description,
    cacheControl,
    robots,
  }: SiteMetadata = useSiteMetadata();

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="cache-control" content={cacheControl} /> 
      <meta name="author" content={author.name} />
      <meta name="description" content={description} /> 
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="AdsBot-Google" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/bootstrap.min.css" />
      <link rel="stylesheet" href="/hamburgers.min.css" />
      <title>{title}</title>
    </>
  );
};
```

</CodeSection>

<br />
There are a few disadvantages to this approach. For instance, customizing some of the Bootstrap SASS variables is out. Also, users may experience FOUC, which is otherwise known as Flash Of Unstyled Content. If you're not picky about this sort of thing, this may be worth it.

You may also add CSS files as you need them to your document `<head>`.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
  useEffect(() => {
    // Dynamically add CSS files based on prismThemes
    if (frontmatter?.prismThemes) {
     frontmatter.prismThemes.forEach((theme) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/prism-themes/${theme}.css`; // Update the path accordingly
        document.head.appendChild(link);
      });
    }
  }, [frontmatter]); // Re-run effect when frontmatter changes

```
</CodeSection>

Otherwise, you can try a combined approach like I have. For some features, I am letting Bootstrap embed in the HTML file. For others, such as Forms or Accordions, I'll go ahead and just minimize and use it as a separate file.

It's always great to have options!
