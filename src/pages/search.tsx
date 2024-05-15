import { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import SharpLink from 'assets/sharp-link.svg';
import MainLayout from 'layouts/MainLayout';
import PoundSign from 'assets/pound.svg';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import FormGroupThemeWrapper from 'wrappers/FormGroupThemeWrapper';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import { useFlexSearch } from 'react-use-flexsearch';
import _ from 'lodash';
import { Formik, Field, Form as FormikForm } from 'formik';

const SearchPage = ({ data }: PageProps<Queries.searchLookupQuery>) => {
  const { postPath, tagsNamePlural } = useSiteMetadata();
  const {
    localSearchPages: { index, store },
    allMdx: { group },
  } = data;
  const [query, setQuery] = useState('');
  const [isFormSubmit, setFormSubmit] = useState(false);
  const results = useFlexSearch(query, index, store);
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Search</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">Search</h1>

          <Formik
            initialValues={{ query: `` }}
            onSubmit={(values, { setSubmitting }) => {
              setQuery(values.query);
              setSubmitting(false);
              !isFormSubmit && setFormSubmit(true);
            }}
          >
            <FormikForm role="search">
              <div className="elasticPartsContainer d-flex">
                <div className="elasticPartsContainer__left">
                  <FormGroupThemeWrapper>
                    <Form.Label htmlFor="searchField">Search for:</Form.Label>
                    <Field
                      id="searchField"
                      name="query"
                      className="form-control"
                      spellCheck="false"
                    />
                  </FormGroupThemeWrapper>
                </div>
                <div className="elasticPartsContainer__right d-flex align-items-end">
                  <Button variant="primary" type="submit" className="w-100">
                    Search
                  </Button>
                </div>
              </div>
            </FormikForm>
          </Formik>

          {isFormSubmit && <h3>Results</h3>}
          <ul className="list-unstyled">
            {results.length > 0
              ? results.map(
                  (result: { id: React.Key; title: string; slug: string }) => {
                    return (
                      <li key={result.id}>
                        <a
                          className="normalLink"
                          href={'/' + postPath + '/' + result.slug}
                          target="_blank"
                        >
                          {result.title}
                          <SharpLink className="sharpLinkIcon" />
                        </a>
                      </li>
                    );
                  },
                )
              : isFormSubmit && <span>No items found</span>}
          </ul>
          <h2 className="pt-4 fsz-13">Tag Cloud</h2>
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

export default SearchPage;

export const searchQuery = graphql`
  query searchLookup {
    localSearchPages {
      index
      store
    }
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
