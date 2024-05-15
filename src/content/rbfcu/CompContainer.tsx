import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';
import { Button, Modal, Spinner } from 'react-bootstrap';
import PickyWrapper from 'wrappers/PickyWrapper/PickyWrapper';

interface ImageQueryResult {
  allRbfcuImages: {
    edges: {
      node: {
        id: string;
        name: string;
        childImageSharp: {
          thumb: ImageDataLike;
          full: ImageDataLike;
        };
      };
    }[];
  };
}

interface Props {
  onClose?: () => void;
}

const CompContainer: React.FC<Props> = ({ onClose = () => {} }) => {
  const data = rbfcuPortQuery();
  const [index, setIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isNextImageReady, setIsNextImageReady] = useState<boolean>(true);

  const { edges: imageEdges } = data.allRbfcuImages;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && !isTransitioning) {
        if (event.key === 'ArrowLeft') {
          navigate(-1);
        } else if (event.key === 'ArrowRight') {
          navigate(1);
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          handleScroll(event.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isTransitioning]);

  const onCloseModal = () => {
    onClose();
    setIsOpen(false);
  };

  const navigate = (step: number) => {
    const newIndex = (index + step + imageEdges.length) % imageEdges.length;
    if (!isTransitioning && isNextImageReady) {
      setIsTransitioning(true);
      setIsNextImageReady(false);
      setTimeout(() => {
        setIndex(newIndex);
        setIsTransitioning(false);
        setIsNextImageReady(true);
      }, 500);
    }
  };

  const handleScroll = (direction: string) => {
    const modalBody = modalRef.current;
    if (modalBody) {
      modalBody.scrollTop += direction === 'ArrowUp' ? -50 : 50; // Adjust the scrolling speed as needed
    }
  };

  const imageName = imageEdges[index]?.node.name.replace(/[_-]/g, ' ');

  const modalImageSize = useMemo(() => {
    const widthFromSrcSet = getImage(
      imageEdges[index]?.node.childImageSharp.full,
    )
      .images.fallback.srcSet.split(',')
      .map((entry) => entry.trim().split(' ')[1]);

    return widthFromSrcSet.includes('400w') || widthFromSrcSet.includes('600w')
      ? 'special-bs-modal--mobile'
      : 'special-bs-modal--desktop';
  }, [index, imageEdges]);

  const preferredMaxWidth = useMemo(() => {
    const widths: { [key: number]: number } = {};
    imageEdges.forEach((edge, i) => {
      widths[i] =
        getImage(edge.node.childImageSharp.full)
          .images.fallback.srcSet.split(',')
          .map((entry) => entry.trim().split(' ')[1])
          .includes('400w') ||
        getImage(edge.node.childImageSharp.full)
          .images.fallback.srcSet.split(',')
          .map((entry) => entry.trim().split(' ')[1])
          .includes('600w')
          ? 90
          : 200;
    });
    return widths;
  }, [imageEdges]);

  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }: any) => (
        <>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap" style={{ rowGap: '1.5rem' }}>
              {imageEdges.map(({ node: img }, imgIndex) => {
                const thumbImage = getImage(img.childImageSharp.thumb);
                if (!thumbImage) return null;
                return (
                  <PickyWrapper
                    key={imgIndex}
                    onClick={() => {
                      setIsOpen(true);
                      setIndex(imgIndex);
                    }}
                    preferredInitialMaxWidth={
                      preferredMaxWidth[imgIndex] || 200
                    }
                  >
                    <GatsbyImage image={thumbImage} alt="testing" />
                  </PickyWrapper>
                );
              })}
            </div>
            <Modal
              centered={true}
              show={isOpen}
              onHide={onCloseModal}
              keyboard={true}
              scrollable
              dialogClassName={`special-bs-modal ${modalImageSize}`}
              data-bs-theme={isDarkMode ? 'dark' : 'light'}
            >
              <Modal.Header id="modal" closeButton>
                <Modal.Title className="fsz-11 text-uppercase font-weight-bold">
                  {isTransitioning ? 'loading...' : imageName}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body ref={modalRef}>
                {isTransitioning ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status" className="m-5">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <GatsbyImage
                    image={getImage(
                      imageEdges[index]?.node.childImageSharp.full,
                    )}
                    alt="testing"
                  />
                )}
              </Modal.Body>
              {!isTransitioning && (
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(-1)}
                    disabled={isTransitioning}
                  >
                    ← Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(1)}
                    disabled={isTransitioning}
                  >
                    Next →
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onCloseModal}
                    disabled={isTransitioning}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              )}
            </Modal>
          </div>
        </>
      )}
    </AdvancedThemeContext.Consumer>
  );
};

export default CompContainer;

export const rbfcuPortQuery = (): ImageQueryResult => {
  const data: ImageQueryResult = useStaticQuery(
    graphql`
      query rbfcuImages {
        allRbfcuImages: allFile(
          filter: { relativeDirectory: { eq: "port/rbfcu" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                thumb: gatsbyImageData(
                  width: 200
                  placeholder: BLURRED
                  formats: [WEBP]
                  layout: CONSTRAINED
                )
                full: gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    `,
  );
  return data;
};
