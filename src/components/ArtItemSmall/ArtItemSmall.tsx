import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import CalendarIcon from 'assets/calendar.svg';
import DoubleChevronArrow from 'assets/double-chevron.svg';
import './ArtItemSmall.scss';

interface ArtItemsSmallProps {
  title: string;
  featuredImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  slug: string;
  description?: string;
  shortLead?: string;
  tags?: string;
  date: string;
  addedStyles?: string;
  useDate?: boolean;
}

const ArtItemSmall = (props: ArtItemsSmallProps) => {
  const { title, featuredImage, slug, date, shortLead, useDate, addedStyles } =
    props;
  const { postPath } = useSiteMetadata();
  return (
    <div className={`${addedStyles} fsz-9`}>
      <a
        role="button"
        className="not-underline"
        href={'/' + postPath + '/' + slug}
      >
        <div className="artButtonSheath h-100">
          <div className="artButton d-flex h-100 position-relative">
            <div className="artButton__first">
              <GatsbyImage
                className="artButtonImg w-100"
                image={getImage(featuredImage.childImageSharp)}
                alt="article featured image"
              />
            </div>
            <div className="artButton__last d-flex flex-column justify-content-center">
              <h3>{title}</h3>

              {useDate && useDate ? (
                <div className="dateLine">
                  <CalendarIcon className="calendarIcon" />
                  <small>{date}</small>
                </div>
              ) : (
                <div className="artButton__shortLead">
                  <span>
                    {shortLead}
                    <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ArtItemSmall;
