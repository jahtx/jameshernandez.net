import TechMiniCard from 'components/TechMiniCard';

const TechUsed = ({ technologies }) => {
  return (
    <>
      <span className="fsz-8">Technologies Used:</span>
      <div className="d-flex flex-row flex-wrap">
        {technologies &&
          technologies.map((tech: string[], index: number) => {
            return (
              <div className="miniCardSection" key={index}>
                <TechMiniCard tech={tech} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TechUsed;
