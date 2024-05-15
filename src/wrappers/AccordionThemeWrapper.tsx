import { Accordion } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const AccordionThemeWrapper = ({ children }) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Accordion
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
            className="mb-3"
          >
            {children}
          </Accordion>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default AccordionThemeWrapper;
