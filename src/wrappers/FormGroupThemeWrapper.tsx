import { Form } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const FormGroupThemeWrapper = ({ children }) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Form.Group data-bs-theme={isDarkMode ? 'dark' : 'light'}>
            {children}
          </Form.Group>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default FormGroupThemeWrapper;
