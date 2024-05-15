import React, { useEffect, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import MainLayout from 'layouts/MainLayout';
import TableOfContents from 'components/TableOfContents';
import { addCopyCodeFunctionality } from 'components/CopyCode';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Container, Breadcrumb } from 'react-bootstrap';
import { MDXProvider } from '@mdx-js/react';
import _ from 'lodash';
import 'styles/index.scss';
import './blogPostTemplate.scss';

const PortPostTemplate: React.FC = ({
  data,
  children,
}: PageProps<Queries.PortPostBySlugQuery>) => {
  const {
    mdx: { frontmatter },
  } = data;

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

  useEffect(() => {
    addCopyCodeFunctionality();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <MainLayout>
      <Container fluid="sm" className="d-flex flex-column align-items-center">
        <div className="inner-container">
          <div className="d-flex justify-content-between pt-2">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/portfolio">Portfolio</Breadcrumb.Item>
              <Breadcrumb.Item active className="breadcrumb-truncate">
                {frontmatter.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <hr className="m-0" />
          <article className="blogPostContainer">
            <div className="blog-post pt-4">
              <h1>{frontmatter.title}</h1>
              <div className="d-flex featuredBox rounded">
                {frontmatter.featuredImage && (
                  <div className="featuredBox__left d-flex justify-content-center align-items-center">
                    <GatsbyImage
                      className="blogPostImage rounded d-block"
                      image={getImage(
                        frontmatter.featuredImage.childImageSharp,
                      )}
                      alt="article featured image"
                    />
                  </div>
                )}
                <div className="d-flex featuredBox__right align-items-center">
                  {frontmatter.description}
                </div>
              </div>
              {frontmatter.showTOC && (
                <TableOfContents tableOfContents={tableOfContents} />
              )}
              <div className="mt-4">
                <MDXProvider>{children}</MDXProvider>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </MainLayout>
  );
};

export const pageQuery = graphql`
  query PortPostBySlug(
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

export { Head } from 'components/Head';

export default PortPostTemplate;
