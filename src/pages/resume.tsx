import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import { PageProps } from 'gatsby';
import resumeFile from 'assets/official-resume.json';
import './resume.scss';

const ResumePage: React.FC<PageProps> = () => {
  const resumeData = resumeFile;

  return (
    <MainLayout>
      <div className="container-sm mx-auto d-flex flex-column align-items-center">
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
            <p>{resumeData.basics.summary}</p>
          </div>

          <ul>
            {resumeData.basics.coreStrengths?.map(
              (coreStrength: string, index: number) => (
                <li key={index}>{coreStrength}</li>
              ),
            )}
          </ul>

          <h2>Experience</h2>

          <div>
            {resumeData.work?.map((workItem, index: number) => {
              const {
                name,
                position,
                highlights,
                clients,
                startDateClean,
                endDateClean,
              } = workItem;

              return (
                <div key={index} className="job mt-3">
                  <h3>{position}</h3>

                  <h4 className="clean">
                    {name} &nbsp;({startDateClean} - {endDateClean})
                  </h4>

                  {/* Job highlights */}
                  {highlights && highlights.length > 0 && (
                    <ul className="job-highlights">
                      {highlights.map((highlight: string, i: number) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  {/* Client projects */}
                  {clients?.map((client, clientIndex: number) => (
                    <div className="clientSection" key={clientIndex}>
                      <h5>Client: {client.name}</h5>

                      {client.highlights && client.highlights.length > 0 && (
                        <ul className="job-highlights">
                          {client.highlights.map(
                            (highlight: string, i: number) => (
                              <li key={i}>{highlight}</li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
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
