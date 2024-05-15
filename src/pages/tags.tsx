import { graphql, PageProps } from 'gatsby';
import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import PoundSign from 'assets/pound.svg';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import _ from 'lodash';

const TagsPage = ({ data }: PageProps<Queries.tagsLookupQuery>) => {
  const {
    allMdx: { group },
  } = data;
  const { tagsNamePlural } = useSiteMetadata();
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Tags</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">Tags</h1>
          <ul className="p-0 d-flex flex-wrap flex-row align-content-start align-items-start gap-1">
            {group.map((tag: { fieldValue: string; totalCount: number }) => (
              <li key={tag.fieldValue} className="d-inline-block ordinaryTag">
                <a
                  href={
                    `/` + tagsNamePlural + `/${_.kebabCase(tag.fieldValue)}/`
                  }
                >
                  <PoundSign className="poundSignWrapper linkIcon" />
                  {tag.fieldValue} ({tag.totalCount})
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query tagsLookup {
    allMdx(
      limit: 2000
      filter: { frontmatter: { status: { eq: "published" } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export { Head } from 'components/Head';
