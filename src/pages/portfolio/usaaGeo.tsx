import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import { PageProps } from 'gatsby';
import UsaaGeoHero from 'components/UsaaGeoHero';

const UsaaGeoPage: React.FC<PageProps> = () => {
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/portfolio">Portfolio</Breadcrumb.Item>
            <Breadcrumb.Item active>USAA GeoEagle</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">USAA GeoEagle</h1>
        </div>
      </div>
      <UsaaGeoHero />
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <article className="fsz-9 mb-5">
            <h2 className="fsz-11 font-weight-bold mt-4">My Work</h2>
            <p>
              When appropriating a “starter” stack from a company like ESRI,
              some features are built-in but require customizations and comfort
              with the coding best practices dictated by a new framework. My
              contributions included:
            </p>
            <ul>
              <li>
                Readable, maintainable and modular JavaScript. This was
                essential for an effort that likely would find its way to
                different development team over a period of years.
              </li>
              <li>
                Easy, intuitive design. Developing a comprehensive help
                documentation and retrofitting special user experience
                ehancements outside of ArcGIS and Dojo defaults.
              </li>
            </ul>
            <h2 className="fsz-11 font-weight-bold">Synopsis</h2>
            <p>
              When you have a nationwide customer base of millions of
              homeowner’s insurance policies you can sometimes get only a myopic
              view from charts and spreadsheets. This project sought to do three
              things:
            </p>
            <ul>
              <li>
                Allow MSRs (Member Service Representatives) to select areas on a
                map and retreive all relevant homeowner policies.
              </li>
              <li>
                Allow MSRs and executives to overlay weather, fire, and other
                maps and measure proximity to potentially catastrophic events.
              </li>
              <li>
                Allow MSRs to export emails and contact information for
                aggregate warnings or instructions to policy owners.
              </li>
            </ul>
            <h2 className="fsz-11 font-weight-bold">Technology Stack</h2>
            <p>
              We utilized services from ESRI, a company that builds and
              maintains a mapping and spatial analytics product called ArcGIS.
              Through their licensing, we were able to house a replica of our
              own confidential data on an in-house server.
            </p>
            <p>
              The front-end part of the stack is built on Dojo Toolkit, an open-
              source modular JavaScript library. The stack incorporates modern
              ECMAScript features such as client-side storage for better memory
              management of large data-sets.
            </p>
          </article>
        </div>
      </div>
    </MainLayout>
  );
};

export default UsaaGeoPage;

export { Head } from 'components/Head';
