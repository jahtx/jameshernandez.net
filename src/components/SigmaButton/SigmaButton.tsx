import DoubleChevronArrow from 'assets/double-chevron.svg';
import './SigmaButton.scss';

interface SigmaButtonProps {
  title: string;
  bestDescription: string;
  slug: string;
  backImage?: string;
}

// SigmaButton is the name for buttons mainly on the Portfolio page

const SigmaButton: React.FC<SigmaButtonProps> = ({
  title,
  slug,
  bestDescription,
  backImage = '',
}) => {
  return (
    <div className="sigmaButtonEnclosure fsz-9">
      <a role="button" className="text-decoration-none" href={slug}>
        <div className="sigmaButtonSheath h-100">
          <div className="sigmaButton d-flex flex-row h-100 position-relative">
            <div className={'sigmaButton__first ' + backImage}></div>
            <div className="sigmaButton__last d-flex flex-column justify-content-center">
              <h3>{title}</h3>
              <p>
                {bestDescription}
                <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SigmaButton;
