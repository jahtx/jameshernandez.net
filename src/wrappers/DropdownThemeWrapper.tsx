import { Dropdown } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const DropdownThemeWrapper = ({ children, className }) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Dropdown
            className={className}
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
          >
            {children}
          </Dropdown>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default DropdownThemeWrapper;
