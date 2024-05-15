---
date: '2024-01-11'
title: 'Development'
tags: ['develop', 'css', 'react', 'svg']
slug: development
featuredImage: dev-symbol.jpg
author: James A. Hernandez
status: key-segment
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
shortLead: 'For development I work with JavaScript, React, HTML5, SASS, CSS, Gatsby'
description: "As a designer, it's always good to be able to go into a developer's workspace and understand how and where they employ your designs. I've kept up with new CSS features, browser compatibility, and accessibility standards. A remarkable amount of tools exist for collaboration including Figma and Zeplin."
---
import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import progLogos from './prog-logos.png';
import cssLogos from './css-logos.png';
import termLogos from './term-logos.png';
import BetterImageModal from 'components/BetterImageModal';

<H2ThemeWrapper>JavaScript and React</H2ThemeWrapper>

<BetterImageModal 
imageUrlFromFolder={progLogos}
title="Prog Logo"
initialPostSize="noCursorNoBorder"
modalImageSize="largeImageModal"
frameStyles="p-3"
initialSize='12rem'
preventShow
/>

JavaScript is always evolving with now ECMAScript 2022 adding more features you would likely find in JavaScript libraries or frameworks. Over the past 8 years, React or React-like frameworks have proven to be a de facto standard in development. React itself has undergone several changes, from usage of Class Components to now Hooks.

 While I am always interested in its evolution, the critical part is making sure you don't stray too far with various features now doing the same thing and confusing a team of developers. It's always important to keep your code manageable and only employ new features if they are clearly required. 


<H2ThemeWrapper>CSS, CSS3, and SASS</H2ThemeWrapper>


<BetterImageModal 
imageUrlFromFolder={cssLogos}
title="CSS Logo"
initialSize='12rem'
initialPostSize="noCursorNoBorder"
modalImageSize="largeImageModal"
frameStyles="p-3"
preventShow
/>


A lot of new developers will encode styles in JavaScript files, but I still prefer to have separate SASS files for each component. I also prefer to use a CSS toolkit like [Bootstrap](https://www.getbootstrap.com) or [Material UI](https://mui.com/). Even if you don't use their components, it's great to take some basic utilities from them such as their responsive breakpoints, grid system, and accessibility defaults. While CSS3 now is powerful enough to have adopted functions and variables, SASS remains a preferred way to optimize CSS, particularly in React.


<H2ThemeWrapper>Unix or Linux Command Utilities</H2ThemeWrapper>

<BetterImageModal 
imageUrlFromFolder={termLogos}
title='Term Logos'
initialSize='12rem'
initialPostSize="noCursorNoBorder"
modalImageSize="largeImageModal"
frameStyles="p-3"
preventShow
/>


I prefer using Mac OS, but have used Linux or Windows with its Linux Subsystem. I prefer using Git on the command line, but some free or paid GUI apps work great as well, and there is now sharp integration with VSCode. Since much of deployment must be done using a CLI, I find its preferable to find its CLI equivalent to keep routine processes quick and seamless. If I see an opportunity for a shortcut, I will usually make a shell function and store it on my bash profile.