import MainLayout from 'layouts/MainLayout';
import { graphql, PageProps } from 'gatsby';

const TypegenPage = ({ data, path }: PageProps<Queries.TypegenPageQuery>) => {
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <hr />

          <p>Query Result:</p>
          <pre className="pt-7-rem">
            Path: {path} <br />
            <br />
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      </div>
    </MainLayout>
  );
};

export default TypegenPage;

export const query = graphql`
  query TypegenPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
