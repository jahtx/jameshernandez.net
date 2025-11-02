import { graphql, useStaticQuery } from 'gatsby';
import './UsaaGeoHero.scss';
import Container from 'react-bootstrap/Container';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const UsaaGeoHero = () => {
  const data = useStaticQuery(
    graphql`
      query laptopData {
        geoLaptop: file(relativePath: { eq: "geo-laptop.png" }) {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [WEBP]
              layout: FIXED
              height: 180
              transformOptions: { fit: OUTSIDE, cropFocus: CENTER }
            )
          }
        }
      }
    `,
  );
  const geoLaptop = data.geoLaptop;

  return (
    <div className="usaaHeroGradient">
      <div className="usaaHeroBack">
        <Container fluid="sm" className="d-flex flex-column align-items-center">
          <div className="geoHeroShell inner-container">
            <GatsbyImage
              image={getImage(geoLaptop)}
              alt="Previous Employers"
              objectFit="contain"
              className="geoLaptop-image"
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UsaaGeoHero;
