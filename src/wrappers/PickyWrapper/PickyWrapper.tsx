import './PickyWrapper.scss';
import MagGlassSvg from 'assets/mag.svg';

const PickyWrapper = ({ children, onClick, preferredInitialMaxWidth }) => {
  return (
    <div
      className="pickyModalContainer d-flex flex-column align-items-center justify-content-center"
      onClick={onClick}
      role="button"
    >
      <div
        className="pickyModalContainer__imgBorder m-1"
        style={{ maxWidth: preferredInitialMaxWidth }}
      >
        {children}
      </div>
      <span className="fsz-8">
        Enlarge <MagGlassSvg className="regularIconSmall" />
      </span>
    </div>
  );
};

export default PickyWrapper;
