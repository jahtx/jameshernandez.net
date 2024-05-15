---
date: '2024-03-24'
title: 'Add a Hamburger Menu to React'
tags: ['gatsby', 'css', 'react', 'svg', 'main']
slug: dropdown-menu-react
featuredImage: hamburger.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "Sometimes I can use the dropdown menus provided by Bootstrap or MUI, but customizing your own provides better flexibility for your design. As long as you keep it accessible, it's relatively easy to do it in React or Gatsby."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import CompBox from 'components/CompBox';

<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />

<H2ThemeWrapper>Creating the Menu</H2ThemeWrapper>

The first thing we'll do is create the menu, using a JSON object and the `map` function. 

We'll create the JSON object at the beginning of the page:

<CodeSection height='11' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx 
const TopAdBannerData: TopAdBannerDataProps[] = [
  {
    menuItem: 'Home',
    url: '/',
  },
  {
    menuItem: 'Search',
    url: '/search',
  },
  {
    menuItem: 'Contact',
    url: '/contact',
  },
  {
    menuItem: 'Portfolio',
    url: '/portfolio',
  },
  {
    menuItem: 'Résumé',
    url: '/resume',
  },
  {
    menuItem: 'Blog',
    url: '/blog',
  },
];
```
</CodeSection>
Then have it repeat in a function in the HTML section. Notice that we'll use ARIA to designate the list as a menu. (For this example, we are using an animated hamburger icon from [Jonsuh](https://github.com/jonsuh/hamburgers)).

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx 
// create a full menu enclosure
<div className="adNavAnchor position-relative align-items-center"> 
// insert your favorite hamburger menu icon
  <div
    className={
      // utilize isActive boolean to animate hamburger
      'hamburger hamburger--spin ' + (isActive ? 'is-active' : null)
    }
    onClick={handleToggle} // handleToggle changes the isActive boolean
    tabIndex={0}
    aria-expanded={isActive ? true : false}
    aria-controls="mobileMenu"
    aria-haspopup="true"
  >
    <div className="adNavHam hamburger-box">
      <div className="hamburger-inner"></div>
    </div>
  </div>

  <ul // dropdown menu begins
    className={
      'adNavDrop position-absolute list-unstyled user-select-none ' +
      (isActive ? 'adNavDrop--show' : null) // class changes with isActive boolean
    }
    id="mobileMenu"
    role="menu"
    aria-labelledby="menubutton"
  >
    {items.map((item) => { // menu is created
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
</div>
    ```
</CodeSection>
<H2ThemeWrapper>Styling the Menu</H2ThemeWrapper>

For your dropdown menu, it's important to anchor the `div` to the hamburger menu. Ensure the hamburger menu element has a position property and make the menu position itself relative to this by using the `absolute` value for the position property.

For the purposes of this example, we are using styles from bootstrap. `position-absolute` and `position-relative` are Bootstrap classes we are using in the code above, so we don't need it in the SCSS code here. 

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
  .adNavAnchor {
    display: block;
    visibility: visible;
    @include media-breakpoint-up(md) {
      display: none;
      visibility: hidden;
    }
  }
  .adNavHam {
    margin: 6px 10px 0 10px;
  }
  ul.adNavDrop {
    right: 0;
    top: 52px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 0.11s, opacity 0.11s linear;
    &--show {
      visibility: visible;
      opacity: 1;
      z-index: 300;
      transition-delay: 0s;
      box-shadow: var(--box-shadow);
    }
    li {
      a {
        background: var(--primary-background);
        padding: 0.2rem 2rem;
        border: 1px solid var(--secondary-background);
        text-decoration: none;
        font-size: 1.1rem;
        color: var(--primary-contrast-color);
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  ```
</CodeSection>

Since this is a React example, we are using hooks to show and hide the menu when clicked.

 <CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
 ```tsx
  const [isActive, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleMenuItemClick = (url: string) => {
    setActive(false); // Close the menu
    window.location.href = url; // Navigate to the URL
  };
```
 </CodeSection>

<H2ThemeWrapper>Menu closes when clicked outside</H2ThemeWrapper>

Another important feature is to make it so that when users click outside the menu, it closes. We do this by creating a `useEffect` which detects when a user is clicking outside the menu, which we have earlier marked with `const menuRef = useRef<HTMLDivElement>(null)`. We then return a simple event listener.

   <CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
 ```tsx
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isActive
      ) {
        setActive(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isActive]);
```
 </CodeSection>