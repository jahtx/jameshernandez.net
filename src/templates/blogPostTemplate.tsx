import React, { useEffect, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import MainLayout from 'layouts/MainLayout';
import TableOfContents from 'components/TableOfContents';
import { addCopyCodeFunctionality } from 'components/CopyCode';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Container, Breadcrumb } from 'react-bootstrap';
import { MDXProvider } from '@mdx-js/react';
import GeneralButton from 'components/GeneralButton';
import SocialLinks from 'components/SocialLinks';
import { truncateText } from 'utils/helpers';
import _ from 'lodash';
import PoundSign from 'assets/pound.svg';
import CalendarIcon from 'assets/calendar.svg';
import 'styles/index.scss';
import './blogPostTemplate.scss';

interface BlogPostTemplateProps {
  data: Queries.BlogPostBySlugQuery;
  children: React.ReactNode;
}

// this uses redundant interface and types purposefully for demonstration
const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  children,
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const { mdx, previous, next, site } = data;
  const { frontmatter } = mdx;
  const { tagsNamePlural, postPath } = site.siteMetadata;
  const [tableOfContents, setTableOfContents] = useState([]);
  const tagsPath = '/' + tagsNamePlural + `/`;

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

              {frontmatter.status === 'portfolio' ? (
                <Breadcrumb.Item href="/portfolio">Portfolio</Breadcrumb.Item>
              ) : frontmatter.status === 'key-segment' ? null : (
                <Breadcrumb.Item href="/blog">Blog</Breadcrumb.Item>
              )}

              <Breadcrumb.Item active className="breadcrumb-truncate">
                {frontmatter.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <hr className="m-0" />
          <article className="blogPostContainer">
            <div className="blog-post pt-4">
              <h1>{frontmatter.title}</h1>
              <div className="d-flex justify-content-between">
                {frontmatter.status &&
                frontmatter.status == 'key-segment' ? null : (
                  <>
                    <div>
                      <CalendarIcon className="calendarIcon" />
                      <small>{frontmatter.date}</small>
                    </div>
                  </>
                )}

                {/* <em className="fsz-9">By: {frontmatter.author}</em> */}
              </div>
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
          {frontmatter.tags &&
          !(
            frontmatter.status === 'key-segment' ||
            frontmatter.status === 'portfolio'
          ) ? (
            <ul className="p-0 w-100 text-end mt-1 clearfix">
              {frontmatter.tags.map((tag: string, index: number) => {
                return (
                  <li key={index} className="d-inline-block ordinaryTag">
                    <a href={tagsPath + _.kebabCase(tag) + '/'}>
                      <PoundSign className="poundSignWrapper linkIcon" />
                      {tag}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {frontmatter.status &&
          (frontmatter.status === 'key-segment' ||
            frontmatter.status === 'portfolio') ? null : (
            <>
              <div className="p-0 m-0 d-flex justify-content-end">
                <SocialLinks />
              </div>
              <nav className="mt-5">
                <ul className="paginationNav d-flex justify-content-between big list-unstyled p-0">
                  <li className="paginationNav__section w-100">
                    {previous && (
                      <GeneralButton
                        link={'/' + postPath + previous.fields.slug}
                        leadIn="Previous"
                        text={truncateText(previous.frontmatter.title, 31)}
                        buttonPosition="left"
                        buttonSize="small"
                        leftChevron
                      />
                    )}
                  </li>
                  <li className="paginationNav__section w-100">
                    {next && (
                      <GeneralButton
                        link={'/' + postPath + next.fields.slug}
                        leadIn="Next"
                        text={truncateText(next.frontmatter.title, 31)}
                        buttonPosition="right"
                        buttonSize="small"
                        rightChevron
                      />
                    )}
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </Container>
    </MainLayout>
  );
};

export default BlogPostTemplate;

export const blogPostQuery = graphql`
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

export { Head } from 'components/Head';
