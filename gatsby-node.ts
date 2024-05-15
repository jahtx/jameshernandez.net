import type { GatsbyNode } from 'gatsby';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import siteConfig from './data/siteConfig';
import _ from 'lodash';

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const { blogListPath, tagsNamePlural, defaultPostsPerPage, postPath } =
    siteConfig;

  const blogPostTemplate = path.resolve(`./src/templates/blogPostTemplate.tsx`);
  const blogListTemplate = path.resolve('./src/templates/blogListTemplate.tsx');
  const portPostTemplate = path.resolve('./src/templates/portPostTemplate.tsx');
  const tagListTemplate = path.resolve(`./src/templates/tagListTemplate.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
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
        keyPosts: allMdx(
          sort: { frontmatter: { date: ASC } }
          filter: { frontmatter: { status: { in: ["key-segment"] } } }
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
        portPosts: allMdx(
          sort: { frontmatter: { date: ASC } }
          filter: { frontmatter: { status: { in: ["portfolio"] } } }
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
        postsRemark: allMdx(
          sort: { frontmatter: { date: DESC } }
          filter: {
            frontmatter: {
              status: { in: ["published", "key-segment", "portfolio"] }
            }
          }
          limit: 2000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
        tagsGroup: allMdx(
          limit: 2000
          filter: {
            frontmatter: {
              status: { in: ["published", "key-segment", "portfolio"] }
            }
          }
        ) {
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const publishedPosts = result.data.publishedPosts.nodes;
  const keyPosts = result.data.keyPosts.nodes;
  const portPosts = result.data.portPosts.nodes;
  const tags = result.data.tagsGroup.group;

  function createPagesForPosts(posts: any, template: any) {
    posts.forEach(
      (
        post: {
          internal: { contentFilePath: string };
          fields: { slug: string; status: string };
          id: string;
        },
        index: number,
      ) => {
        const previousPostId = index === 0 ? null : posts[index - 1].id;
        const nextPostId =
          index === posts.length - 1 ? null : posts[index + 1].id;

        createPage({
          path: `/${postPath}${post.fields.slug}`,
          status: post.fields.status,
          component: `${template}?__contentFilePath=${post.internal.contentFilePath}`,
          context: {
            id: post.id,
            slug: post.fields.slug,
            previousPostId,
            nextPostId,
          },
        });
      },
    );
  }

  if (publishedPosts.length > 0) {
    createPagesForPosts(publishedPosts, blogPostTemplate);
  }
  if (keyPosts.length > 0) {
    createPagesForPosts(keyPosts, blogPostTemplate);
  }
  if (portPosts.length > 0) {
    createPagesForPosts(portPosts, portPostTemplate);
  }

  function getPostsArray() {
    const combinedObject = {};
    if (publishedPosts.length > 0) {
      publishedPosts.forEach(
        (
          post: {
            frontmatter: { tags: [] };
          },
          index: number,
        ) => {
          const key = `array_${index + 1}`;
          combinedObject[key] = post.frontmatter.tags;
        },
      );
    }
    return combinedObject;
  }
  const postsArrayWithTags = getPostsArray();

  function countArraysContainingWord(obj: any, word: string) {
    let count = 0;

    for (const key in obj) {
      if (obj[key].includes(word)) {
        count++;
      }
    }

    return count;
  }

  // Create tag list pages with pagination
  tags.forEach((tag: { fieldValue: string }) => {
    const postsPerTagPage = 6;
    const numTagPages = Math.ceil(
      countArraysContainingWord(postsArrayWithTags, tag.fieldValue) /
        postsPerTagPage,
    );
    const kebabTag = _.kebabCase(tag.fieldValue);
    Array.from({ length: numTagPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/` + tagsNamePlural + `/${kebabTag}`
            : `/` + tagsNamePlural + `/${kebabTag}/${i + 1}`,
        component: tagListTemplate,
        context: {
          tag: tag.fieldValue,
          limit: postsPerTagPage,
          skip: i * postsPerTagPage,
          numTagPages,
          currentPage: i + 1,
        },
      });
    });
  });

  // Create blog list pages with pagination
  const numberPostsPerPage = 9;
  const numPages = Math.ceil(publishedPosts.length / numberPostsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` + blogListPath : `/` + blogListPath + `/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: numberPostsPerPage,
        skip: i * numberPostsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  createRedirect({
    fromPath: `/blah`,
    toPath: `/`,
  });
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

// export const onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `Mdx`) {
//     createNodeField({
//       node,
//       name: `timeToRead`,
//       value: readingTime(node.body),
//     });
//   }
// };
