import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const RecaptchaThemeWrapper = ({ id, className, sitekey, onChange }) => {
  const recapRef = React.useRef(null);
  return (
    <AdvancedThemeContext.Consumer>
      {() => {
        return (
          <ReCAPTCHA
            id={id}
            className={className}
            ref={recapRef}
            sitekey={sitekey}
            onChange={onChange}
          />
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default RecaptchaThemeWrapper;
