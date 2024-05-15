import MainLayout from 'layouts/MainLayout';
import { Container, Breadcrumb } from 'react-bootstrap';
import { PageProps } from 'gatsby';
import TechUsed from 'components/TechUsed';
import resumeFile from 'assets/official-resume.json';
import './resume.scss';

const ResumePage: React.FC<PageProps> = () => {
  const resumeData = resumeFile;
  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          {/* START */}
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Résumé</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">Résumé</h1>

          <div className="mt-4 mb-4">
            <h2>{resumeData.basics.label}</h2>
            {resumeData.basics.summary}
          </div>
          <ul>
            {resumeData.basics.coreStrengths &&
              resumeData.basics.coreStrengths.map(
                (coreStrength: string, index: number) => {
                  return <li key={index}>{coreStrength}</li>;
                },
              )}
          </ul>
          <h2>Experience</h2>
          <div>
            {resumeData.work &&
              resumeData.work.map((workItem: any, index: number) => {
                const {
                  summary,
                  clients,
                  name,
                  position,
                  technologies,
                  startDateClean,
                  endDateClean,
                } = workItem;
                return (
                  <div key={index} className="job mt-3">
                    <h3>{position}</h3>

                    <h4 className="clean">
                      {name} &nbsp;({startDateClean} - {endDateClean})
                    </h4>
                    <div>
                      {clients ? null : (
                        <>
                          <p>{summary}</p>
                          <aside>
                            {technologies && (
                              <TechUsed technologies={technologies} />
                            )}
                          </aside>
                        </>
                      )}
                    </div>
                    {/* div created to contain all the clients */}
                    <div>
                      {clients &&
                        clients.map((client: any, index: number) => {
                          const { name, summary, technologies } = client;

                          return (
                            <div className="clientSection" key={index}>
                              <h5>Client: {name}</h5>
                              <p>{summary}</p>
                              {technologies && (
                                <TechUsed technologies={technologies} />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* END */}
        </div>
      </div>
    </MainLayout>
  );
};

export default ResumePage;

export { Head } from 'components/Head';
