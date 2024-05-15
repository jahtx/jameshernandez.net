// NOT CURRENTLY USED

import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            tagline
            description
            author {
              name
            }
            siteUrl
            keywords
            cacheControl
            robots
            postPath
            blogListPath
            tagsName
            tagsNamePlural
            copyrightHolder
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};
