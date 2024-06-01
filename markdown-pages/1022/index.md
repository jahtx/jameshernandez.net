---
date: '2024-04-09'
title: 'Add Dark Mode to React'
tags: ['gatsby', 'css', 'react', 'svg', 'main']
slug: dark-mode-gatsby-react
featuredImage: night-mode.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "A lot of developers like to view their code using a dark color scheme, and often that applies to websites as well. We also know that for those sensitive to bright color palletes, it's nice to have options. This article will detail my efforts in apply dark mode to Gatsby projects."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import CompBox from 'components/CompBox';

<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />


<H2ThemeWrapper>Create Dark/Light properties on Body Tag</H2ThemeWrapper>

There are Gatsby plugin options to incorporate DarkMode, but in this case we will use React's Context capability. This will let any React component read properties from [React Context](https://www.gatsbyjs.com/blog/2019-01-31-using-react-context-api-with-gatsby/).


At the very root of your SCSS file, let's incorporate some CSS variables that we can use throughout the application. At the root level, we want to esablish the colors of these variables will change if the root class of your `body` element has either the `dark` class or not.

<CodeSection height='30' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
:root {
  --primary-contrast-color: #FFFFFF;
  --secondary-contrast-color: #000000;

  [...]

  --primary-background: #000000;
  --secondary-background: #FFFFFF;

}

body.dark {
  --primary-contrast-color: #000000;
  --secondary-contrast-color: #FFFFFF;

  [...]

  --primary-background: #FFFFFF;
  --secondary-background: #000000;

}

```
</CodeSection>

Now that we've done this, we can now use this variable to change colors of icons or other elements if this root class of `dark` is present or not.

<CodeSection height='50' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```scss
.genButton {
  text-align: center;
  transition: ease 0.3s;
  border: 4px solid var(--secondary-contrast-color);
  background-color: var(--secondary-background);
  padding: 0.5em 1.1em;
  top: 0;
  box-shadow: none;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--primary-contrast-color);
}
    ```
</CodeSection>


<H2ThemeWrapper>Create Context Component</H2ThemeWrapper>

Before we create the Toggle Button, we will create a component that holds our variable. This variable will also use localStorage on the user's browser to hold the boolean that stores whether dark mode is on or off.

(You can read more about using React's Context API with Gatsby [here](https://www.gatsbyjs.com/blog/2019-01-31-using-react-context-api-with-gatsby/) )

<CodeSection height='30' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx 
import { createContext, useContext, useEffect, useState } from 'react';

interface AdvancedThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AdvancedThemeContext = createContext<
  AdvancedThemeContextProps | undefined
>(undefined);

const AdvancedThemeProvider = ({ children }) => {
    // use react hooks for initial variable
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    // use localStorage on user's browser
    localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <AdvancedThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </AdvancedThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(AdvancedThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { AdvancedThemeProvider, useTheme };

```
</CodeSection>

This code does two things. It changes the root class of `body` to `dark` on and off, and also it allows you to use the `isDarkMode` variable in any other part of your application you choose to wrap with `AdvancedThemeProvider`. This can be useful if you are using Bootstrap Components that change their dark-mode properties on something other than a CSS class, such as `data-bs-theme`.

<CodeSection height='50' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx{7,12}
import { Form } from 'react-bootstrap';
import { AdvancedThemeContext } from 'contexts/AdvancedThemeContext';

const FormThemeWrapper = ({ children, className, onSubmit }) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Form
            className={className}
            onSubmit={onSubmit}
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
          >
            {children}
          </Form>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default FormThemeWrapper;
```
</CodeSection>

<H2ThemeWrapper>DarkMode Toggle Button</H2ThemeWrapper>

I then create a DarkMode component I will later insert into my Top Banner. 

<CodeSection height='50' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
import React from 'react';
import DarkModeIcon from 'assets/official-dark.svg';
import { useTheme } from 'contexts/AdvancedThemeContext';

const DarkStateToggle: React.FC = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <div
      onClick={() => {
        toggleDarkMode();
      }}
      style={{ padding: '10px 20px', cursor: 'pointer' }}
    >
      <DarkModeIcon
        className="regularIcon"
        role="button"
        onClick={() => {
          toggleDarkMode();
        }}
      />
    </div>
  );
};
```
</CodeSection>


<H2ThemeWrapper>DarkMode Default</H2ThemeWrapper>

The last point, if you'd like to default the app for dark mode, the easiest way to add it is to create a `gatsby-ssr.tsx` file and add it here.

<CodeSection height='50' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
exports.onRenderBody = ({ setBodyAttributes, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
   setBodyAttributes({
     className: 'dark',
   });
};

```
</CodeSection>

Good luck!