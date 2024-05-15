import { Form } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const FormThemeWrapper = ({ children, className, onSubmit }) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Form
            className={className}
            onSubmit={onSubmit}
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
          >
            {children}
          </Form>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default FormThemeWrapper;
