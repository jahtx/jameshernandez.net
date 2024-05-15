import { Container } from 'react-bootstrap';
import ArtItemSmall from 'components/ArtItemSmall';
import GeneralButton from 'components/GeneralButton';
import './ArticleSegment.scss';

interface ArticleSegmentProps {
  posts: any;
  sectTitle?: string;
  useDate?: boolean;
  showBlogButton?: boolean;
}

const ArticleSegment = (props: ArticleSegmentProps) => {
  const { posts, sectTitle, useDate, showBlogButton } = props;
  return (
    <Container fluid="sm" className="d-flex flex-column align-items-center">
      <div className="inner-container">
        {sectTitle && <h2 className="pt-4">{sectTitle}</h2>}
        <ul
          className={
            sectTitle && sectTitle
              ? 'artSegmentList d-flex justify-content-between list-unstyled'
              : 'pt-4 artSegmentList d-flex justify-content-between list-unstyled'
          }
        >
          {posts.map(({ node }, index: string) => {
            const { title, slug, featuredImage, date, shortLead } =
              node.frontmatter;
            return (
              <ArtItemSmall
                key={index}
                title={title || slug}
                featuredImage={featuredImage}
                slug={slug}
                date={date}
                shortLead={shortLead}
                useDate={useDate}
                addedStyles="artItemEnclosure"
              />
            );
          })}
        </ul>
        {showBlogButton && showBlogButton ? (
          <div className="w-100 d-flex justify-content-end">
            <GeneralButton rightChevron text="More Posts" link="/blog" />
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default ArticleSegment;
