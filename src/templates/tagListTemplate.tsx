import { graphql, Link, PageProps } from 'gatsby';
import MainLayout from 'layouts/MainLayout';
import { Container, Dropdown } from 'react-bootstrap';
import ArtElement from 'components/ArtElement';
import GeneralButton from 'components/GeneralButton';
import DropdownThemeWrapper from 'wrappers/DropdownThemeWrapper';
import PoundSign from 'assets/pound.svg';
import { flattenAny } from 'utils/helpers';
import _ from 'lodash';

type BlogListProps = {
  tag: any;
  currentPage: number;
  numTagPages: number;
};

const BlogList = ({
  data,
  pageContext,
}: PageProps<Queries.tagListQuery, BlogListProps>) => {
  const { tag, currentPage, numTagPages } = pageContext;
  const {
    postsByTag: { totalCount },
    site: {
      siteMetadata: { tagsNamePlural },
    },
    postsByTag: { edges: allPostsByTag },
    allPosts: { edges: allPagePosts },
  } = data;
  const tagsPath = `/${tagsNamePlural}/`;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numTagPages;
  const prevPage =
    currentPage - 1 === 1
      ? `${tagsPath}${_.kebabCase(tag)}/`
      : `${tagsPath}${_.kebabCase(tag)}/` + (currentPage - 1).toString();
  const nextPage =
    `${tagsPath}${_.kebabCase(tag)}/` + (currentPage + 1).toString();

  const tagLine = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  const allTagsList = flattenAny(
    allPagePosts.map((edge) => edge.node.frontmatter.tags),
  );
  const tags = [...new Set(allTagsList.sort())];

  return (
    <MainLayout>
      <Container fluid="sm" className="d-flex flex-column align-items-center">
        <div className="inner-container">
          <div className="articleList">
            <Container className="mb-3">
              <h1>Topic: {tag}</h1>
              <div className="text-end">
                <strong>{tagLine}</strong>
              </div>
            </Container>

            <Container className="tagPageContainer d-flex">
              <h2 className="visually-hidden">
                List of Articles that are of the topic {tag}
              </h2>
              <div className="tagPageContainer__articles">
                <ul className="tagListSegment d-flex list-unstyled">
                  {allPostsByTag.map(({ node }, index: number) => {
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
                        addedStyles="artElementZone--tagList"
                      />
                    );
                  })}
                </ul>
                <nav className="mb-2">
                  <ul className="paginationNav d-flex justify-content-between list-unstyled p-0 m-0">
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

              <div className="tagPageContainer__tagCloud flex-wrap">
                <DropdownThemeWrapper className="tagCloudDropdown w-100">
                  <Dropdown.Toggle id="dropdown-basic" className="w-100">
                    Go to Topic
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="w-100">
                    {tags.map(function (tag: string) {
                      const id = 'id' + Math.random().toString(16).slice(2);
                      return (
                        <Dropdown.Item
                          key={id}
                          as={Link}
                          to={tagsPath + _.kebabCase(tag) + '/'}
                        >
                          {tag}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </DropdownThemeWrapper>
                <ul className="tagCloudFull p-0 flex-wrap flex-row align-content-start align-items-start gap-1">
                  {tags.map((tag: string, index: number) => {
                    return (
                      <li key={index} className="d-inline-block ordinaryTag">
                        <Link
                          to={tagsPath + _.kebabCase(tag) + '/'}
                          className="no-break fsz-9"
                        >
                          <PoundSign className="poundSignWrapper linkIcon" />
                          {tag}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export const tagPageListQuery = graphql`
  query tagList($tag: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        blogListPath
        tagsName
        tagsNamePlural
      }
    }
    postsByTag: allMdx(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { in: [$tag] }, status: { eq: "published" } }
      }
    ) {
      totalCount
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
    allPosts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { status: { eq: "published" } } }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;

export default BlogList;

export { Head } from 'components/Head';
