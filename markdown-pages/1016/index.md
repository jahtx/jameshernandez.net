---
date: '2023-12-05'
title: 'Easy Accessibility Fixes'
tags: ['svg', 'accessibility', 'main']
slug: header-accessibility
featuredImage: accessibility.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: 'An incredibly talented friend of mine is fully blind and managed to trudge through and finish law school, but still encounters an unacceptable number of inaccessible tools and services. Products are still made today without the simplest regards for disabled persons. We should comply with Section 508 because everyone should have equal access. And because it is good karma.'
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import CompBox from 'components/CompBox';

<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />
<br />
**Accessibility shouldn't be an afterthought.** Even if your company is a start-up, at some point during a potential aquisition, questions may arise on how long it will take to get your products into compliance. If you haven't started _thinking_ about accessiblity yet, things could get expensive. Luckily, if your designers and developers keep an eye out for some common pitfalls, you can avoid some serious tech debt.

<H2ThemeWrapper>Properly account for Title and Header</H2ThemeWrapper>

It's very easy to overlook the layout of your web app. How is this presented to a screenreader? Is the document laid out in a way that makes sense?


A screenreader will easily get tripped up over an non-descriptive XML file. To ensure your file has the necessary properties, open your SVG file and look at the start of the file. At the beginning of your file, add an attribute to `<svg>` called `"aria-labelledby"`. Declare its value as `"title"`. Just after your `<svg\>` tag, include an element called `<title>`, and insert the name of your site.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```svg
<svg aria-labelledby="title" role="img" viewBox="0 0 726 514" version="1.1" 
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" >
<title id="title" lang="en">James Hernandez — Senior User Experience Designer 
and Front-end Developer</title>
 
```
</CodeSection>

Nice! For good measure, make sure you wrap the entire thing in an `h1` tag so accessibiilty tools know it's the primary header.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```html
<h1 className="p-0 m-0 d-flex align-items-center">
   [...]
</h1>
```
</CodeSection>
<br />
Other resources: [SVG & Icon Fonts](http://web-accessibility.carnegiemuseums.org/code/svg/#:~:text=In%20the%20SVG%20tag%2C%20include,for%20users%20of%20assistive%20technology.)

<H2ThemeWrapper>Mobile Menus</H2ThemeWrapper>

Accessible Rich Internet Applications (ARIA) are used to enhance accessibility with websites. This is certainly not meant to replace native HTML semantics and behavior for assistive tech. It just never hurts to use both.

Mobile menus could be enhanced with some ARIA properties. For the menu item itself, I like to use `aria-expanded` and have it toggle true or false based on its status. I aslo use `aria-controls` to let the browser know what element is controlled by it, which in this case is labeled as 'mobileMenu' by its `id`. I can also use `aria-haspopup` to let the user know there's an element appearing or disappearing based on its status.

Aside from ARIA, you're menu toggle should be a button so that it will toggle on and off when a user clicks on their spacebar.

<CodeSection height='40' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
  <button
    type="button"
    className={
      'hamburger hamburger--spin ' + (isActive ? 'is-active' : null)
    }
    onClick={handleToggle}
    aria-label="Show Navigation Menu"
    tabIndex={0}
    id="menubutton"
    aria-expanded={isActive ? true : false}
    aria-controls="mobileMenu"
    aria-haspopup="true"
  >
    <div className="adNavHam hamburger-box">
      <div className="hamburger-inner"></div>
    </div>
  </button>
  <ul
    className={
      'adNavDrop position-absolute list-unstyled user-select-none ' +
      (isActive ? 'adNavDrop--show' : null)
    }
    id="mobileMenu"
    role="menu"
    aria-labelledby="menubutton"
    aria-label="website menu"
  >
    {items.map((item) => {
      const id = 'id' + Math.random().toString(16).slice(2); // unique identifier
      const { menuItem, url } = item;
      return (
        <li key={id} role="presentation">
          <a
            className="d-block"
            href={url}
            role="menuitem"
            onClick={() => handleMenuItemClick(url)}
          >
            {menuItem}
          </a>
        </li>
      );
    })}
  </ul>
```
</CodeSection>

<H2ThemeWrapper>Navigation & ARIA Hidden</H2ThemeWrapper>

Properly marked navigation is critical. You remembered to wrap your main navigation with `nav`. But did you remember your navigation at the bottom? Did you also wrap this for your Previous and Next button or anything that directs the user through the app?

- Every navigating element should be wrapped with a `nav` tag. Lists and nested lists should be used for intricate site layouts.

Are you making sure elements that are invisible to sighted users are not being caught by screenreaders?

In this case, we have a list item that's part of a navigation. If the page is the first of many, we don't want the Previous button to show. We don't want it to show up in the DOM inadvertently and cause confusion. A javascript ternary is demonstrated below hiding the wrapping `<li>` so it does not get improperly read.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```html
<li
  aria-hidden={isFirst ? 'true' : 'false'}
  className="paginationNav__section smallWidth">
  {!isFirst && (
    <PaginationButton
      href={prevPage}
      buttonContent="Previous"
      buttonPosition="left"
      buttonSize="small"
    />
  )}
</li>
```
</CodeSection>

