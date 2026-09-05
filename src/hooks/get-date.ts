import { useStaticQuery, graphql } from 'gatsby';

export const useGetDate = () => {
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
