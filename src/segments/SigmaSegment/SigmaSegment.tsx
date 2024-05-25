import { Container } from 'react-bootstrap';
import SigmaButton from 'components/SigmaButton';
import './SigmaSegment.scss';

interface PortDataProps {
  title: string;
  bestDescription: string;
  slug: string;
  backImage: string;
}

const PortData: PortDataProps[] = [
  {
    title: 'Noblr',
    bestDescription:
      'Noblr is a subsidary of USAA. They offer an insurance product that was unique to USAA and the industry at the time: paying only for the time you drive your car.',
    slug: '/article/noblr-ux',
    backImage: 'noblr-back',
  },
  {
    title: 'Randolph-Brooks Federal Credit Union',
    bestDescription:
      "This effort encompassed a full redesign of the credit union's main website as well as a thorough review of existing pages and their metrics.",
    slug: '/article/rbfcu-ux',
    backImage: 'rbfcu-back',
  },
  {
    title: 'USAA',
    bestDescription:
      'In-house development of a web app allowed service representatives and executives to find and notify members in the path of a storm or other catastrophic event.',
    slug: '/portfolio/usaaGeo',
    backImage: 'usaa-back',
  },
  {
    title: 'Promotions Board for Military Branch',
    bestDescription:
      'Revamped a promotions application from legacy tech by replicating features and adding new requirements as specified by a promotions board. Applied a complete User Experience process in a SCRUM environment.',
    slug: '/article/military',
    backImage: 'mil-back',
  },
];
const SigmaSegment = () => {
  const items = PortData;
  return (
    <Container fluid="sm" className="d-flex flex-column align-items-center">
      <div className="inner-container">
        <ul className="pt-4 sigmaSegmentList justify-content-between d-flex align-content-stretch align-items-stretch list-unstyled">
          {items.map((item: PortDataProps, index: number) => {
            const { title, bestDescription, slug, backImage } = item;

            return (
              <SigmaButton
                key={index}
                title={title}
                slug={slug}
                bestDescription={bestDescription}
                backImage={backImage}
              />
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

export default SigmaSegment;
