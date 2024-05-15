import React from 'react';
import './ImageColWrapper.scss';

interface ImageColWrapperProps {
  children?: React.ReactNode;
  onClick: () => void;
  gutter: string;
}

const ImageColWrapper = ({
  children,
  onClick,
  gutter,
}: ImageColWrapperProps) => {
  return (
    <div className="imageColumn" role="button" onClick={onClick}>
      <div
        className="d-flex flex-grow-0 flex-shrink-0 align-items-center justify-content-center"
        style={{ margin: gutter }}
      >
        {children}
      </div>
    </div>
  );
};

export default ImageColWrapper;
