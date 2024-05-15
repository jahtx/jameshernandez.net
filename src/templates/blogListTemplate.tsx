import React from 'react';
import { graphql } from 'gatsby';
import { Breadcrumb } from 'react-bootstrap';
import MainLayout from 'layouts/MainLayout';
import ArtElement from 'components/ArtElement';
import GeneralButton from 'components/GeneralButton';

type MyProps = {
  data: any;
  pageContext: { currentPage: number; numPages: number };
};
export default class BlogList extends React.Component<MyProps> {
  render() {
    const blogListPath =
      '/' + this.props.data.site.siteMetadata.blogListPath + '/';
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
      currentPage - 1 === 1
        ? // change this to blogListPath if you want to make blog 1st separate
          // from home page
          blogListPath
        : // '/'
          blogListPath + (currentPage - 1).toString();
    const nextPage = blogListPath + (currentPage + 1).toString();
    const {
      publishedMdx: { edges: posts },
    } = this.props.data;

    return (
      <MainLayout>
        <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
          <div className="inner-container">
            <Breadcrumb className="pt-1">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Blog</Breadcrumb.Item>
            </Breadcrumb>
            <hr className="m-0" />
            <h1 className="pt-4">Blog</h1>
            <ul className="pt-4 blogListSegment d-flex flex-nowrap list-unstyled">
              <div className="w-100">
                <div className="artRows d-flex flex-wrap">
                  {posts.map(({ node }, index: number) => {
                    const {
                      title,
                      slug,
                      featuredImage,
                      description,
                      tags,
                      date,
                    } = node.frontmatter;
                    return (
                      <ArtElement
                        key={index}
                        title={title || slug}
                        featuredImage={featuredImage}
                        slug={slug}
                        description={description}
                        tags={tags}
                        date={date}
                        useDate
                        addedStyles="artElementZone--blogList"
                      />
                    );
                  })}
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center mt-4">
          <div className="inner-container">
            <nav className="blogNav mb-2">
              <ul className="paginationNav justify-content-between d-flex list-unstyled p-0 m-0">
                <li
                  aria-hidden={isFirst ? 'true' : 'false'}
                  className="paginationNav__section smallWidth"
                >
                  {!isFirst && (
                    <GeneralButton
                      link={prevPage}
                      text="Previous"
                      buttonPosition="left"
                      leftChevron
                    />
                  )}
                </li>
                <li className="paginationNav__section smallWidth">
                  {!isLast && (
                    <GeneralButton
                      link={nextPage}
                      text="Next"
                      buttonPosition="right"
                      rightChevron
                    />
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export const blogListQuery = graphql`
  query blogList($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        blogListPath
      }
    }
    publishedMdx: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { status: { eq: "published" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            description
            tags
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  quality: 85
                  placeholder: BLURRED
                  formats: [WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`;

export { Head } from 'components/Head';
