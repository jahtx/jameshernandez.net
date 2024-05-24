import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Button, Modal } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';
import MagGlassSvg from 'assets/mag.svg';
import './BetterImageModal.scss';

interface ImageModalProps {
  title: string;
  altInfo?: string;
  initialSize?: string;
  modalImageSize?: 'mediumImageModel' | 'largeImageModal' | 'xlargeImageModal';
  searchedGatsbyImage?: string;
  imageUrlFromFolder?: string;
  centered?: string;
  frameStyles?: string;
  border?: boolean;
  noDarkModal?: boolean;
  modalMaxWidth?: string;
  modalSize?: 'sm' | 'lg' | 'xl';
  fullScreen?: 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down';
  preventShow?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalSize,
  centered,
  initialSize,
  modalImageSize,
  frameStyles,
  searchedGatsbyImage,
  imageUrlFromFolder,
  title,
  altInfo,
  border,
  modalMaxWidth,
  noDarkModal,
  fullScreen,
  preventShow,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);

  const imageData = searchedGatsbyImage
    ? data.allImageSharp.nodes.find(
        (node: any) =>
          node.gatsbyImageData.images.fallback.src.endsWith(
            searchedGatsbyImage,
          ) ||
          node.gatsbyImageData.images.sources.find((source: any) =>
            source.srcSet.endsWith(searchedGatsbyImage),
          ),
      )
    : null;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => !preventShow && setShow(true);

  if (!searchedGatsbyImage && !imageUrlFromFolder) {
    throw new Error('Both GatsbyImage and imageUrlFromFolder are missing.');
  }

  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }: any) => (
        <>
          <div
            className={`w-auto d-flex flex-column align-items-center ${frameStyles}`}
            role={preventShow ? '' : 'button'}
          >
            {searchedGatsbyImage && imageData ? (
              <span onClick={handleShow}>
                <GatsbyImage
                  className={`initialPostSize--universal mw-100 ${
                    border ? ' initial-image-border' : ''
                  }`}
                  style={{ width: initialSize }}
                  image={getImage(imageData.gatsbyImageData)}
                  alt={altInfo || title}
                />
              </span>
            ) : (
              <img
                src={imageUrlFromFolder || ''}
                onClick={handleShow}
                style={{ width: initialSize }}
                alt={altInfo || title}
                className={`initialPostSize--universal mw-100 ${
                  border ? ' initial-image-border' : ''
                }`}
              />
            )}
            {!preventShow && (
              <a
                role="button"
                href="#"
                onClick={handleShow}
                className="fsz-8 non-blue"
              >
                Enlarge <MagGlassSvg className="regularIconSmall" />
              </a>
            )}
          </div>
          <Modal
            centered={centered && centered === 'false' ? false : true}
            show={show}
            onHide={handleClose}
            size={modalSize || undefined}
            fullscreen={fullScreen || undefined}
            keyboard={true}
            animation
            style={{ maxWidth: modalMaxWidth, margin: '1rem auto' }}
            data-bs-theme={isDarkMode && !noDarkModal ? 'dark' : 'light'}
            dialogClassName={
              noDarkModal && noDarkModal
                ? `bs-modal ${modalImageSize}`
                : `darkmode-bs-modal ${modalImageSize}`
            }
          >
            <Modal.Header closeButton>
              <Modal.Title className="fsz-11 text-uppercase font-weight-bold">
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {searchedGatsbyImage && imageData ? (
                <GatsbyImage
                  className="w-100"
                  image={getImage(imageData.gatsbyImageData)}
                  alt={title || ''}
                />
              ) : (
                <img
                  src={imageUrlFromFolder || ''}
                  alt={title || ''}
                  className="w-100"
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </AdvancedThemeContext.Consumer>
  );
};

export default ImageModal;
