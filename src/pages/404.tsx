import { useState } from 'react';
import { graphql } from 'gatsby';
import SharpLink from 'assets/sharp-link.svg';
import MainLayout from 'layouts/MainLayout';
import { Form, Container, Button } from 'react-bootstrap';
import FormGroupThemeWrapper from 'wrappers/FormGroupThemeWrapper';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import { useFlexSearch } from 'react-use-flexsearch';
import { Formik, Field, Form as FormikForm } from 'formik';

const FourOhFour = ({ data: { localSearchPages, calIcon } }) => {
  const { index, store } = localSearchPages;
  const [query, setQuery] = useState(null);
  const [isFormSubmit, setFormSubmit] = useState(false);
  const results = useFlexSearch(query, index, store);
  const { title } = useSiteMetadata();
  return (
    <MainLayout>
      <Container>
        <h1 className="text-center">
          Oops! Looks like we don't have that page 🫤
        </h1>
        <h2 className="mt-5">Search {title}</h2>

        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setQuery(values.query);
            setSubmitting(false);
            !isFormSubmit && setFormSubmit(true);
          }}
        >
          <FormikForm>
            <div className="elasticPartsContainer d-flex">
              <div className="elasticPartsContainer__left">
                <FormGroupThemeWrapper>
                  <Form.Label htmlFor="searchField">Search for:</Form.Label>
                  <Field
                    id="searchField"
                    name="query"
                    className="form-control"
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
                        href={'/' + result.slug}
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
      </Container>
    </MainLayout>
  );
};

export default FourOhFour;

export const query = graphql`
  query localSearchFour {
    localSearchPages {
      index
      store
    }
  }
`;

export { Head } from 'components/Head';
