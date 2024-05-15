import { useState, useEffect } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { Container } from 'react-bootstrap';
import './MainSegment.scss'; // Import your SCSS styles here

const MainSegment: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "sticky-nametags" } }) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [WEBP]
              transformOptions: { fit: CONTAIN, cropFocus: CENTER }
            )
          }
          name
        }
      }
    }
  `);

  const images = data.allFile.nodes;
  const [lastImageName, setLastImageName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedImageName = localStorage.getItem('lastImageName');

    // Function to select a random image different from the last one
    const selectRandomImage = () => {
      let randomImage: { name: string };
      do {
        randomImage = images[Math.floor(Math.random() * images.length)];
      } while (randomImage.name === storedImageName); // Ensure it's different from last image
      return randomImage;
    };

    const randomImage = selectRandomImage();
    setSelectedImage(randomImage);
    setLastImageName(randomImage.name);
    localStorage.setItem('lastImageName', randomImage.name);
  }, [images]);

  return (
    <section className="mt-4 fsz-9">
      <Container fluid="sm" className="d-flex flex-column align-items-center">
        <div className="inner-container">
          <div className="mainBox d-flex c-border w-100 p-3">
            <div className="mainBox__first d-flex align-items-center justify-content-center">
              {selectedImage && (
                <GatsbyImage
                  className="tagImg"
                  image={getImage(selectedImage.childImageSharp)}
                  alt="Name Tag"
                />
              )}
            </div>
            <div className="mainBox__second">
              <span className="mainBox__hello text-center">Hello!</span>
              <p>
                I'm a Product & Services UX Designer and Front-end Engineer in
                the San Antonio area. I am passionate about solving complex app
                design problems from conception to deployment to continuous
                improvement. During my career, I have contributed to efforts for
                web projects for USAA, Accenture, Outside Analytics, RBFCU, the
                U.S. Air Force, and the U.S. Department of Education.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MainSegment;
