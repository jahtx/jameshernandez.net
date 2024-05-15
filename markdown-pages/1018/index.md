---
date: '2024-02-05'
title: 'Adding a Mastodon link to Gatsby posts'
tags: ['mastodon', 'gatsby', 'social', 'main']
slug: mastodon-link-gatsby
featuredImage: mastodon.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: 'For awhile, everyone was talking about moving on from Twitter/X. So what are some of the other available social networks? And now are most or any websites going to have share links to the other networks? No one should assume the social media titans of today will last into perpetuity. In the spirit of that, here is how you can add Mastodon to GatsbyJS sites.'
---

import { Form, Container, Button, Accordion } from 'react-bootstrap';
import AccordionThemeWrapper from 'wrappers/AccordionThemeWrapper';
import CodeSection from 'components/CodeSection';
import CompBox from 'components/CompBox';
import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import BetterImageModal from 'components/BetterImageModal';
import promptImage from './prompt.png';

<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />
<br />
One thing that's unusual about Mastodon is the server is not always the same. Most of the time, people are on Mastodon.social, but here's how you can account for this.

<H2ThemeWrapper>Setting up Share Links for Facebook and Twitter</H2ThemeWrapper>

A preview of the full code can be viewed here.

<CodeSection height='10' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
import FacebookSvg from 'assets/social/facebook.svg';
import TwitterXSvg from 'assets/social/x-twitter.svg';
import MastadonSvg from 'assets/social/mastadon.svg';

const SocialLinks = () => {
const url = typeof window !== 'undefined' ? window.location.href : '';
const openInNewTab = (dynamicUrl: any) => {
window.open(
dynamicUrl + url,
'\_blank',
'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600',
);
};

const handleFBUrl = () => {
const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
openInNewTab(fbUrl);
};
const handleTwitterUrl = () => {
const twitterUrl = 'https://twitter.com/share?url=';
openInNewTab(twitterUrl);
};
const handleMastadonUrl = () => {
const openMastodon = () => {
openInNewTab(
'https://' +
localStorage.getItem('mastodon-instance') +
'/share?text=' +
encodeURIComponent(document.title) +
'%0A' +
url,
);
};
if (localStorage.getItem('mastodon-instance')) {
openMastodon();
} else {
let instance = window.prompt('Please tell me your Mastodon instance');
if (instance) {
localStorage.setItem('mastodon-instance', instance);
openMastodon();
}
}
};
return (

<div className="d-flex">
<a href="#" title="Share on Facebook" onClick={handleFBUrl}>
<FacebookSvg className="socialIcon regularIcon linkIcon" />
</a>
<a href="#" title="Share on Twitter" onClick={handleTwitterUrl}>
<TwitterXSvg className="socialIcon regularIcon linkIcon" />
</a>
<a href="#" title="Share on Mastadon" onClick={handleMastadonUrl}>
<MastadonSvg className="socialIcon regularIcon linkIcon" />
</a>
</div>
);
};

export default SocialLinks;

````
</CodeSection>


Let's deconstruct the code a little. This assumes you have a component that contains all your share links.

Let's call our component ShareLinks and include a helper function at the beginning.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
const url = typeof window !== 'undefined' ? window.location.href : '';
const openInNewTab = (dynamicUrl: any) => {
  window.open(
    dynamicUrl + url,
    '_blank',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600',
  );
};
````

</CodeSection>

Next we account for the main social media accounts which utilize the openInNewTab helper function:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
const handleFBUrl = () => {
  const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
  openInNewTab(fbUrl);
};
const handleTwitterUrl = () => {
  const twitterUrl = 'https://twitter.com/share?url=';
  openInNewTab(twitterUrl);
};
```
</CodeSection>

This function receives a URL such as Facebook or Twitter, and returns a pop-up window respectively.

So the corresponding div will call on `handleFBUrl` to fire.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
<a href="#" title="Share on Facebook" onClick={handleFBUrl}>
  <FacebookSvg className="socialIcon regularIcon linkIcon" />
</a>
```
</CodeSection>

<H2ThemeWrapper>Setting up Share Link for Mastodon</H2ThemeWrapper>

To set up a Mastodon link, I borrowed heavily from this [post](https://dev.to/codepo8/adding-a-share-to-mastodon-link-to-any-web-site-485m) on Dev.to from [Christian Heilmann](https://dev.to/codepo8).

We're going to use `localStorage` on the user's browser to keep this information handy. (Usage of `localStorage` does not require the user's permission.)

First, we're going to write another helper function, this time one that calls to retrieve a variable named 'mastodon-instance'.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
const handleMastadonUrl = () => {
  const openMastodon = () => {
    openInNewTab(
      'https://' +
        localStorage.getItem('mastodon-instance') +
        '/share?text=' +
        encodeURIComponent(document.title) +
        '%0A' +
        url,
    );
  };
```
</CodeSection>

Of course, we don't want to retrieve this variable if it doesn't exist on the user's computer yet, so we are going to check for it, and ask the user for it if it's unavailable.

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
if (localStorage.getItem('mastodon-instance')) {
  openMastodon();
} else {
  let instance = window.prompt('Please tell me your Mastodon instance');
  if (instance) {
    localStorage.setItem('mastodon-instance', instance);
    openMastodon();
  }
}
```
</CodeSection>

The prompt should look something like this:

<BetterImageModal 
imageUrlFromFolder={promptImage}
title="Mastadon Prompt"
initialSize="20rem"
modalImageSize="largeImageModal"
frameStyles="p-3"
border
/>

<br />

The entire code is provided below:

<CodeSection height='10' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
import FacebookSvg from 'assets/social/facebook.svg';
import TwitterXSvg from 'assets/social/x-twitter.svg';
import MastadonSvg from 'assets/social/mastadon.svg';

const SocialLinks = () => {
const url = typeof window !== 'undefined' ? window.location.href : '';
const openInNewTab = (dynamicUrl: any) => {
window.open(
dynamicUrl + url,
'\_blank',
'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600',
);
};

const handleFBUrl = () => {
const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
openInNewTab(fbUrl);
};
const handleTwitterUrl = () => {
const twitterUrl = 'https://twitter.com/share?url=';
openInNewTab(twitterUrl);
};
const handleMastadonUrl = () => {
const openMastodon = () => {
openInNewTab(
'https://' +
localStorage.getItem('mastodon-instance') +
'/share?text=' +
encodeURIComponent(document.title) +
'%0A' +
url,
);
};
if (localStorage.getItem('mastodon-instance')) {
openMastodon();
} else {
let instance = window.prompt('Please tell me your Mastodon instance');
if (instance) {
localStorage.setItem('mastodon-instance', instance);
openMastodon();
}
}
};
return (

<div className="d-flex">
<a href="#" title="Share on Facebook" onClick={handleFBUrl}>
<FacebookSvg className="socialIcon regularIcon linkIcon" />
</a>
<a href="#" title="Share on Twitter" onClick={handleTwitterUrl}>
<TwitterXSvg className="socialIcon regularIcon linkIcon" />
</a>
<a href="#" title="Share on Mastadon" onClick={handleMastadonUrl}>
<MastadonSvg className="socialIcon regularIcon linkIcon" />
</a>
</div>
);
};

export default SocialLinks;

```

</CodeSection>

