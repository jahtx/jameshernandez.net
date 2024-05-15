import DoubleChevronArrow from 'assets/double-chevron.svg';
import LeftDoubleChevronArrow from 'assets/double-chevron-left.svg';
import './GeneralButton.scss';

interface GeneralButtonProps {
  text: string;
  link: string;
  buttonPosition?: 'right' | 'left';
  buttonSize?: string;
  leadIn?: string;
  rightChevron?: boolean;
  leftChevron?: boolean;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({
  text,
  link,
  buttonPosition,
  buttonSize = null,
  leadIn = null,
  rightChevron = false,
  leftChevron = false,
}) => {
  return (
    <a role="button" className={`not-underline ${buttonSize}`} href={link}>
      <div className="genButtonSheath">
        <div
          className={`genButton d-flex flex-column position-relative rounded-3 genButton--${buttonPosition}`}
        >
          {leadIn ? (
            <div className="leadIn">
              {leftChevron ? (
                <LeftDoubleChevronArrow className="generalArrowIcon generalArrowIcon--left" />
              ) : null}
              {leadIn}
              {rightChevron ? (
                <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
              ) : null}
            </div>
          ) : null}
          <span>
            {leftChevron && !leadIn ? (
              <LeftDoubleChevronArrow className="generalArrowIcon generalArrowIcon--left" />
            ) : null}
            {text}
            {rightChevron && !leadIn ? (
              <DoubleChevronArrow className="generalArrowIcon generalArrowIcon--right" />
            ) : null}
          </span>
        </div>
      </div>
    </a>
  );
};

export default GeneralButton;
