import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import { PageProps } from 'gatsby';
import resumeFile from 'assets/official-resume.json';
import './resume.scss';

interface WorkItem {
  name?: string;
  position?: string;
  startDateClean?: string;
  endDateClean?: string;
  highlights?: string[];
}

interface EducationItem {
  institution?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
}

interface SkillCategory {
  name?: string;
  keywords?: string[];
}

interface ResumeData {
  basics: {
    label?: string;
    summary?: string;
    coreStrengths?: string[];
  };
  work?: WorkItem[];
  education?: EducationItem[];
  skills?: SkillCategory[];
}

const resumeData = resumeFile as ResumeData;

const getYear = (date?: string): string => (date ? date.slice(0, 4) : '');

const joinDates = (start?: string, end?: string): string =>
  [start, end].filter(Boolean).join(' - ');

const ResumePage: React.FC<PageProps> = () => {
  const { basics } = resumeData;
  const work = resumeData.work ?? [];
  const education = resumeData.education ?? [];
  const skills = (resumeData.skills ?? []).filter(
    (skill) => skill.name && skill.keywords?.length,
  );

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
            <h2>{basics.label}</h2>
            {basics.summary}
          </div>
          {basics.coreStrengths && basics.coreStrengths.length > 0 && (
            <ul>
              {basics.coreStrengths.map((coreStrength) => (
                <li key={coreStrength}>{coreStrength}</li>
              ))}
            </ul>
          )}

          {work.length > 0 && (
            <section className="resume-section">
              <h2>Professional Experience</h2>
              {work.map((job) => {
                const dates = joinDates(job.startDateClean, job.endDateClean);
                const highlights = job.highlights ?? [];
                return (
                  <div
                    key={`${job.name}-${job.startDateClean}`}
                    className="job mt-3"
                  >
                    <h3>{job.position}</h3>
                    <h4 className="clean">
                      {job.name}
                      {dates && <> &nbsp;({dates})</>}
                    </h4>
                    {highlights.length > 0 && (
                      <ul>
                        {highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {education.length > 0 && (
            <section className="resume-section">
              <h2>Education</h2>
              {education.map((item, index) => {
                const credential = [item.studyType, item.area]
                  .filter(Boolean)
                  .join(', ');
                const dates = joinDates(
                  getYear(item.startDate),
                  getYear(item.endDate),
                );
                return (
                  <div key={index} className="mt-3">
                    <h3>{item.institution}</h3>
                    {credential && <p className="mb-1">{credential}</p>}
                    {dates && <p className="mb-1">{dates}</p>}
                  </div>
                );
              })}
            </section>
          )}

          {skills.length > 0 && (
            <section className="resume-section">
              <h2>Tools &amp; Technologies</h2>
              {skills.map((skill) => (
                <div key={skill.name} className="mt-3">
                  <h3>{skill.name}</h3>
                  <p>{skill.keywords?.join(', ')}</p>
                </div>
              ))}
            </section>
          )}
          {/* END */}
        </div>
      </div>
    </MainLayout>
  );
};
export default ResumePage;
export { Head } from 'components/Head';
