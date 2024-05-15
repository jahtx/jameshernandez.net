import MainLayout from 'layouts/MainLayout';
import { graphql, PageProps } from 'gatsby';
import MainSegment from 'segments/MainSegment';
import ArticleSegment from 'segments/ArticleSegment';
import PortResSegment from 'segments/PortResSegment';

const Home: React.FC = ({ data }: PageProps<Queries.indexBlogListQuery>) => {
  const blogPosts = data.mainMdx.edges.slice(0, 3);
  const keySegPosts = data.keySegMdx.edges.slice(0, 3);

  return (
    <MainLayout>
      <MainSegment />
      <PortResSegment />
      <ArticleSegment posts={keySegPosts} />
      <ArticleSegment
        sectTitle="Blog"
        posts={blogPosts}
        showBlogButton
        useDate
      />
    </MainLayout>
  );
};
export const indexBlogListQuery = graphql`
  query indexBlogList {
    site {
      siteMetadata {
        blogListPath
        defaultPostsPerPage
      }
    }
    mainMdx: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { status: { eq: "published" } } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            description
            tags
            status
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
    keySegMdx: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { status: { eq: "key-segment" } } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            description
            shortLead
            tags
            status
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

export default Home;

export { Head } from 'components/Head';
