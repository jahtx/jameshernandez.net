import { useStaticQuery, graphql } from 'gatsby';

export const getDate = () => {
  const dateInfo = useStaticQuery(
    graphql`
      query {
        currentBuildDate {
          currentDate
        }
      }
    `,
  );
  return dateInfo;
};
