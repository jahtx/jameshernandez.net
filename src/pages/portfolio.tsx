import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import SigmaSegment from 'segments/SigmaSegment';

const PortNewPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Portfolio</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">Portfolio</h1>
        </div>
      </div>
      <SigmaSegment />
    </MainLayout>
  );
};

export default PortNewPage;

export { Head } from 'components/Head';
