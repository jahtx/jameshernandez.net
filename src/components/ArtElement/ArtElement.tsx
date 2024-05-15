import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import CalendarIcon from 'assets/calendar.svg';
import DoubleChevronArrow from 'assets/double-chevron.svg';
import './ArtElement.scss';

interface ArtElementsProps {
  title: string;
  featuredImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  slug: string;
  description?: string;
  shortLead?: string;
  tags?: {};
  date: string;
  addedStyles?: string;
  useDate?: boolean;
}

const ArtElement = (props: ArtElementsProps) => {
  const { title, featuredImage, slug, date, shortLead, useDate, addedStyles } =
    props;
  const { postPath } = useSiteMetadata();
  const dateline = {
    padding: '0 0 0.2em 0',
  };
  return (
    <div
      className={`${addedStyles} artElementZone d-flex justify-content-center fsz-9`}
    >
      <div className="artElementEnclosure">
        <a
          role="button"
          className="not-underline"
          href={'/' + postPath + '/' + slug}
        >
          <div className="artElementButtonSheath h-100">
            <div className="artElementButton d-flex h-100 position-relative">
              <div className="artElementButton__first">
                <GatsbyImage
                  className="artElementButtonImg w-100"
                  image={getImage(featuredImage.childImageSharp)}
                  alt="article featured image"
                />
              </div>
              <div className="artElementButton__last d-flex flex-column justify-content-center">
                <h3>{title}</h3>

                {useDate && useDate ? (
                  <div style={dateline}>
                    <CalendarIcon className="calendarIcon" />
                    <small>{date}</small>
                  </div>
                ) : (
                  <div className="artElementButton__shortLead">
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
    </div>
  );
};

export default ArtElement;
