import { Container } from 'react-bootstrap';
import DoubleChevronArrow from 'assets/double-chevron.svg';
import Briefcase from 'assets/briefcase.svg';
import Resume from 'assets/resume-docs.svg';
import './PortResSegment.scss';

const PortResSegment = () => {
  return (
    <section className="mt-2 fsz-9">
      <Container fluid="sm" className="d-flex flex-column align-items-center">
        <div className="inner-container portResSegmentHolder d-flex justify-content-between">
          <div className="portResItemEnclosure fsz-9">
            <a role="button" className="not-underline" href="/portfolio">
              <div className="portResButtonSheath h-100">
                <div className="portResButton d-flex h-100 position-relative">
                  <div className="portResButton__area">
                    <div className="d-flex flex-row align-items-center justify-content-between mb-1">
                      <h2 className="p-0 m-0">Portfolio</h2>
                      <Briefcase className="regularIcon" />
                    </div>
                    <p>
                      These are examples of past work and some ongoing projects.
                      Ultimately I will be including a wide variety of
                      collateral materials, including wireframes, research
                      examples, and finished prototypes.
                      <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="portResItemEnclosure fsz-9">
            <a role="button" className="not-underline" href="/resume">
              <div className="portResButtonSheath h-100">
                <div className="portResButton d-flex h-100 position-relative">
                  <div className="portResButton__area d-flex flex-column">
                    <div className="d-flex flex-row align-items-center justify-content-between mb-1">
                      <h2 className="p-0 m-0">Résumé</h2>
                      <Resume className="resumeIcon" />
                    </div>
                    <p>
                      I have created interfaces and developed applications for
                      multiple industries including banking, military, and
                      education. I enjoy improving usability for customers and
                      internal users and applying industry best practices
                      through the entire design and development process.
                      <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PortResSegment;
