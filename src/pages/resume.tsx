import MainLayout from 'layouts/MainLayout';
import { Breadcrumb } from 'react-bootstrap';
import { PageProps } from 'gatsby';
import resumeFile from 'assets/official-resume.json';
import './resume.scss';

interface WorkItem {
  name?: string;
  position?: string;
  location?: string;
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
    name?: string;
    label?: string;
    summary?: string;
  };
  work?: WorkItem[];
  education?: EducationItem[];
  skills?: SkillCategory[];
}

const resumeData = resumeFile as ResumeData;

const getYear = (date?: string): string => (date ? date.slice(0, 4) : '');

const joinDates = (start?: string, end?: string): string =>
  [start, end].filter(Boolean).join(' - ');

const SectionHeading: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => (
  <h2 id={id} className="h6 text-uppercase fw-bold pb-2 mb-4 border-bottom">
    {children}
  </h2>
);

const ResumePage: React.FC<PageProps> = () => {
  const { basics } = resumeData;
  const work = resumeData.work ?? [];
  const education = resumeData.education ?? [];
  const skills = (resumeData.skills ?? []).filter(
    (skill) => skill.name && skill.keywords?.length,
  );

  return (
    <MainLayout>
      <main className="resume-page container-xl py-4 py-lg-5">
        <Breadcrumb className="d-print-none">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Résumé</Breadcrumb.Item>
        </Breadcrumb>

        <header className="pt-3 pb-5 mb-5 border-bottom">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-2">{basics.name}</h1>
              <h2 className="h3 fw-normal mb-4">{basics.label}</h2>
              <p className="lead mb-4">{basics.summary}</p>
              <nav
                aria-label="Résumé links"
                className="d-flex flex-wrap gap-4 fw-semibold d-print-none"
              >
                <a href="/portfolio">View selected projects &rarr;</a>
              </nav>
            </div>
          </div>
        </header>

        <div className="row g-5">
          {work.length > 0 && (
            <section className="col-lg-8" aria-labelledby="experience-heading">
              <SectionHeading id="experience-heading">
                Professional Experience
              </SectionHeading>
              {work.map((job, index) => {
                const dates = joinDates(job.startDateClean, job.endDateClean);
                const highlights = job.highlights ?? [];
                return (
                  <article
                    key={`${job.name}-${job.startDateClean}`}
                    className={
                      index < work.length - 1 ? 'pb-4 mb-4 border-bottom' : ''
                    }
                  >
                    <div className="d-flex flex-column flex-md-row justify-content-md-between gap-1 mb-3">
                      <div>
                        <h3 className="h5 fw-bold mb-1">{job.position}</h3>
                        <p className="mb-0">
                          <span className="fw-semibold">{job.name}</span>
                          {job.location && (
                            <span className="opacity-75">
                              {' '}
                              &middot; {job.location}
                            </span>
                          )}
                        </p>
                      </div>
                      {dates && (
                        <p className="small opacity-75 text-md-end text-nowrap mb-0">
                          {dates}
                        </p>
                      )}
                    </div>
                    {highlights.length > 0 && (
                      <ul className="mb-0 ps-3">
                        {highlights.map((highlight, i) => (
                          <li key={i} className="mb-2">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </section>
          )}

          <aside className="col-lg-4">
            {skills.length > 0 && (
              <section className="mb-5" aria-labelledby="expertise-heading">
                <SectionHeading id="expertise-heading">
                  Tools &amp; Technologies
                </SectionHeading>
                <dl className="mb-0">
                  {skills.map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <dt className="fw-bold mb-1">{skill.name}</dt>
                      <dd className="small opacity-75 mb-0">
                        {skill.keywords?.join(', ')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {education.length > 0 && (
              <section aria-labelledby="education-heading">
                <SectionHeading id="education-heading">
                  Education
                </SectionHeading>
                {education.map((item, index) => {
                  const credential = [item.studyType, item.area]
                    .filter(Boolean)
                    .join(', ');
                  const dates = joinDates(
                    getYear(item.startDate),
                    getYear(item.endDate),
                  );
                  return (
                    <div key={index} className="mb-3">
                      <h3 className="h6 fw-bold mb-1">{item.institution}</h3>
                      {credential && <p className="mb-0">{credential}</p>}
                      {dates && (
                        <p className="small opacity-75 mb-0">{dates}</p>
                      )}
                    </div>
                  );
                })}
              </section>
            )}
          </aside>
        </div>
      </main>
    </MainLayout>
  );
};
export default ResumePage;
export { Head } from 'components/Head';
