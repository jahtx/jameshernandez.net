import type { GatsbyConfig } from 'gatsby';
import siteConfig from './data/siteConfig';
// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

const getSiteUrl = () => {
  return 'https://jameshernandez.net';
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: siteConfig.title,
    tagline: siteConfig.tagline,
    siteUrl: siteConfig.siteUrl,
    description: siteConfig.description,
    author: {
      name: siteConfig.author.name,
    },
    keywords: siteConfig.keywords,
    social: {
      twitter: siteConfig.social.twitter,
    },
    cacheControl: siteConfig.cacheControl,
    robots: siteConfig.robots,
    blogListPath: siteConfig.blogListPath,
    tagsName: siteConfig.tagsName,
    tagsNamePlural: siteConfig.tagsNamePlural,
    postPath: siteConfig.postPath,
    copyrightHolder: siteConfig.copyrightHolder,
    defaultPostsPerPage: siteConfig.defaultPostsPerPage,
    googleAnalyticsID: siteConfig.googleAnalyticsID,
  },
  graphqlTypegen: {
    typesOutputPath: `gatsby-types.d.ts`,
    generateOnBuild: false,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `DM Sans:300,400,500,600,700`,
          `Ubuntu Mono:400`,
          `Satisfy`,
          `Open Sans`,
        ],
        display: 'swap',
      },
    },
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: 'YYYY', // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'src/images/fav/jh-modern-fav.png',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [siteConfig.googleAnalyticsID],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/search/`],
      },
    },
    `gatsby-plugin-slug`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/markdown-key`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/markdown-port`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: siteConfig.siteRss,
            title: siteConfig.siteRssTitle,
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
            // optional configuration to specify external rss feed, such as feedburner
            link: 'https://feeds.feedburner.com/gatsby/blog',
          },
        ],
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;
