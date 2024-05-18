---
date: '2023-09-22'
title: 'Create an automated Table of Contents with MDX'
tags: ['gatsby', 'react', 'markdown', 'mdx']
slug: table-of-contents-mdx
featuredImage: toc.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "Within blog posts, I have a need to summarize the post by H2 tags, which I don't wish to do manually. This code will take all H2 tags and assign anchor tags and summarize as a Table of Contents, as with this post."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import BetterImageModal from 'components/BetterImageModal';
import CompBox from 'components/CompBox';


<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />

<H2ThemeWrapper>Using an MDX Template</H2ThemeWrapper>


As with all blog posts, we have each markdown document cycle over our blog template. (For the purpose of brevity, this code has been reduced to show a simple MDX template.)

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
// blogTemplate.tsx

  <MainLayout>
    <Container fluid="sm" >
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {frontmatter.status === 'portfolio' ? (
              <Breadcrumb.Item href="/portfolio">Portfolio</Breadcrumb.Item>
            ) : frontmatter.status === 'key-segment' ? null : (
              <Breadcrumb.Item href="/blog">Blog</Breadcrumb.Item>
            )}
            <Breadcrumb.Item active className="breadcrumb-truncate">
              {frontmatter.title}
            </Breadcrumb.Item>
          </Breadcrumb>
            <h1>{frontmatter.title}</h1>
            <div>
              <MDXProvider>{children}</MDXProvider>
            </div>
    </Container>
  </MainLayout>
  ```
</CodeSection>

The first thing we would like to do is have automatic anchor tags placed on our H2 headings. We do this by taking advantage of MDX and creating a react component that will envelop our H2 in our MDX document.

This is the component:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
// H2ThemeWrapper.tsx

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}
const H2ThemeWrapper = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;
  return (
    <h2 className="remark__h2 mt-4" id={anchor}>
      <a href={link}>§ &nbsp;</a>
      {children}
    </h2>
  );
};
export default H2ThemeWrapper;

```
</CodeSection>

And this is how it's used in our MDX document:


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```tsx
// index.md
---
date: '2023-10-08'
title: 'Create an automated Table of Contents with MDX'
tags: ['gatsby', 'react', 'markdown', 'mdx']
slug: table-of-contents-mdx
featuredImage: toc.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "Within blog posts, I have a need to summarize the post by H2 tags, which I don't wish to do manually. This code will take all H2 tags and assign anchor tags and summarize as a Table of Contents, as with this post."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';


<H2ThemeWrapper>Using an MDX Template</H2ThemeWrapper>
```
</CodeSection>

<H2ThemeWrapper>Creating the TOC</H2ThemeWrapper>

Once we have the anchor tags automated, now we move on to the task of creating the TOC. We'll create a useEffect in our template to pull all the H2s from Markdown (in this case all H2s using the class `remark__h2`).


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">

```tsx
// blogTemplate.tsx
  const [tableOfContents, setTableOfContents] = useState([]);
  
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.remark__h2')).map(
      (heading) => {
        const anchor = heading.id;
        const title = heading.textContent.replace('§', '').trim(); // Remove the initial link symbol
        return { title, anchor };
      },
    );
    setTableOfContents(headings);
  }, []);
  ```
</CodeSection>

A separate component is used to stylize our TOC when it's created:


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">


```tsx
// TableOfContents.tsx

interface TableOfContentsProps {
  tableOfContents: { title: string; anchor: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
}) => {
  return (
    <div className="tableOfContents mt-4 rounded">
      <h2>Table of Contents</h2>
      <ul>
        {tableOfContents.map((item) => (
          <li key={item.anchor}>
            <a href={`#${item.anchor}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
```
</CodeSection>

And now our TOC can be inserted in the blog template, as such (in this case, conditional on a boolean if you so wish):

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
``` tsx
    {frontmatter.showTOC && (
      <TableOfContents tableOfContents={tableOfContents} />
    )}
```
</CodeSection>
