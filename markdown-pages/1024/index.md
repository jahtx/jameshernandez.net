---
date: '2024-03-08'
title: 'Blog posting with MDX & Gatsby'
tags: ['gatsby', 'react', 'markdown', 'mdx']
slug: markdown-gatsby
featuredImage: mdx-logo.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: "There are huge advantages to using MDX as opposed to regular markdown, including the ability to use and create components to increase styling and improve just overall experiences with your blog."
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import BetterImageModal from 'components/BetterImageModal';
import CompBox from 'components/CompBox';

<CompBox techItems={["Node 18","React 18", "Gatsby 5", "TypeScript 5"]} />

<H2ThemeWrapper>Using gatsby-plugin-mdx </H2ThemeWrapper>


First begin by installing the [plugin](https://www.gatsbyjs.com/docs/how-to/routing/mdx/). 

I don't think I had seen this working in a Gatsby 5 project with TypeScript, so I have provided my configuration below. My configuration includes use of [PrismJS](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/), [LocalSearch](https://www.gatsbyjs.com/plugins/gatsby-plugin-local-search/), and [Remark Classes](gatsby-remark-classes). 


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```javascript
// gatsby-config.ts
   {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
          {
            resolve: 'gatsby-plugin-local-search',
            options: {
              // A unique name for the search index. This should be descriptive of
              // what the index contains. This is required.
              name: 'pages',

              // Set the search engine to create the index. This is required.
              // The following engines are supported: flexsearch, lunr
              engine: 'flexsearch',

              // Provide options to the engine. This is optional and only recommended
              // for advanced users.
              //
              // Note: Only the flexsearch engine supports options.
              engineOptions: 'speed',

              // GraphQL query used to fetch all data for the search index. This is
              // required.
              query: `
                {
                  allMdx {
                    nodes {
                      id
                      frontmatter {
                        slug
                        title
                      }
                      body
                    }
                  }
                }
              `,

              // Field used as the reference value for each document.
              // Default: 'id'.
              ref: 'id',

              // List of keys to index. The values of the keys are taken from the
              // normalizer function below.
              // Default: all fields
              index: ['title', 'body'],

              // List of keys to store and make available in your UI. The values of
              // the keys are taken from the normalizer function below.
              // Default: all fields
              store: ['id', 'slug', 'title'],

              // Function used to map the result from the GraphQL query. This should
              // return an array of items to index in the form of flat objects
              // containing properties to index. The objects must contain the `ref`
              // field above (default: 'id'). This is required.
              normalizer: ({ data }) =>
                data.allMdx.nodes.map((node: any) => ({
                  id: node.id,
                  path: node.frontmatter.slug,
                  title: node.frontmatter.title,
                  slug: node.frontmatter.slug,
                  body: node.body,
                })),
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]': 'remark__h1',
                'heading[depth=2]': 'remark__h2',
                'heading[depth=3]': 'remark__h3',
                'heading[depth=4]': 'remark__h4',
                'heading[depth=5]': 'remark__h5',
                paragraph: 'remark__para',
                'list[ordered=true]': 'remark__orderedList',
                'list[ordered=false]': 'remark__unorderedList',
              },
            },
          },
        ],
      },
    },
    ```
</CodeSection>

<H2ThemeWrapper>Using MDXProvider</H2ThemeWrapper>

Install [mdx-js/react](https://www.npmjs.com/package/@mdx-js/react). 

Now you will need to go into your `gatsby-node.ts` file and change your queries to call `AllMdx`.

<CodeSection height="20" darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```graphql
    query Alpine {
      publishedPosts: allMdx(
        sort: { frontmatter: { date: ASC } }
        filter: { frontmatter: { status: { in: ["published"] } } }
      ) {
        nodes {
          id
          frontmatter {
            tags
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
```
</CodeSection>

In your queries, you will call `mdx` and its `frontmatter` very much the same way as before. Some of the items have changed.

<CodeSection height="20" darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```graphql
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        blogListPath
        postPath
        tagsName
        tagsNamePlural
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        slug
        author
        showTOC
        status
        prismThemes
        featuredImage {
          childImageSharp {
            gatsbyImageData(quality: 100, placeholder: BLURRED, formats: [WEBP])
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
```
</CodeSection>



In your templates, you will import the provider.

<CodeSection  darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```jsx
import { MDXProvider } from '@mdx-js/react';
```
</CodeSection>
Then insert it as you would with Remark.
<CodeSection  darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```jsx
  <div className="mt-4">
    <MDXProvider>{children}</MDXProvider>
  </div>
```
</CodeSection>