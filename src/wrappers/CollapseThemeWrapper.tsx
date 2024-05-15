import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { AdvancedThemeContext } from 'wrappers/AdvancedThemeContext';

const CollapseThemeWrapper = ({ children, buttonText }) => {
  const [open, setOpen] = useState(false);
  return (
    <AdvancedThemeContext.Consumer>
      {() => {
        return (
          <>
            <Button
              className="mt-1 mb-3"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              {buttonText + (open ? ' ↑' : ' ↓')}
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text mt-3">{children}</div>
            </Collapse>
          </>
        );
      }}
    </AdvancedThemeContext.Consumer>
  );
};

export default CollapseThemeWrapper;
