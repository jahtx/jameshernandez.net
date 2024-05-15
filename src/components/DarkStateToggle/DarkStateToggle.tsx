import React from 'react';
import DarkModeIcon from 'assets/official-dark.svg';
import { useTheme } from 'wrappers/AdvancedThemeContext';

const DarkStateToggle: React.FC = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <div
      onClick={() => {
        toggleDarkMode();
      }}
      style={{ padding: '10px 20px', cursor: 'pointer' }}
    >
      <DarkModeIcon
        className="regularIcon"
        role="button"
        onClick={() => {
          toggleDarkMode();
        }}
      />
    </div>
  );
};

export default DarkStateToggle;
