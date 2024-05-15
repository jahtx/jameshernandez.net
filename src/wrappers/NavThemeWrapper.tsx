import { Navbar } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

interface NavThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
  expand?: string;
}

const NavThemeWrapper: React.FC<NavThemeWrapperProps> = ({
  children,
  className = '',
  expand = '',
}) => {
  return (
    <AdvancedThemeContext.Consumer>
      {({ isDarkMode }) => {
        return (
          <Navbar
            className={className}
            expand={expand}
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
          >
            {children}
          </Navbar>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default NavThemeWrapper;
