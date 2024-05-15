import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Button, Modal } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';
import MagGlassSvg from 'assets/mag.svg';

interface RefinedImageModalProps {
  title: string;
  altInfo?: string;
  initialPostSize: string;
  initialSize?: string;
  modalImageSize?: string;
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

const RefinedImageModal: React.FC<RefinedImageModalProps> = ({
  modalSize,
  centered,
  initialPostSize,
  initialSize,
  modalImageSize,
  frameStyles,
  imageUrlFromFolder,
  title,
  altInfo,
  border,
  modalMaxWidth,
  noDarkModal,
  fullScreen,
  preventShow,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => !preventShow && setShow(true);

  if (!imageUrlFromFolder) {
    throw new Error('Both GatsbyImage and imageUrlFromFolder are missing.');
  }

  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => (
        <>
          <div
            className={`w-auto d-flex flex-column align-items-center ${frameStyles}`}
          >
            <img
              src={imageUrlFromFolder || ''}
              onClick={handleShow}
              style={{ width: initialSize }}
              alt={altInfo || title}
              className={`initialPostSize--universal mw-100 ${initialPostSize}${
                border ? ' initial-image-border' : ''
              }`}
            />
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
              <img
                src={imageUrlFromFolder || ''}
                alt={title || ''}
                className="w-100"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </AdvancedThemeContext.Consumer>
  );
};

export default RefinedImageModal;
