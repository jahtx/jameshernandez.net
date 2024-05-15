import React from 'react';
import { useTheme } from 'wrappers/AdvancedThemeContext'; // Update path accordingly
import './CodeSection.scss';

type MyProps = {
  boxSize?: string;
  height?: string;
  darkTheme?: string;
  lightTheme?: string;
  fontSize?: string;
};

const CodeSection: React.FC<React.PropsWithChildren<MyProps>> = ({
  height,
  darkTheme = 'prism-coldark-dark', // Default value for darkTheme
  lightTheme = 'prism-ghcolors', // Default value for lightTheme
  fontSize,
  children,
}) => {
  const { isDarkMode } = useTheme();

  // Use darkTheme if dark mode is enabled, otherwise use lightTheme
  const themeClass = isDarkMode ? darkTheme : lightTheme;

  // Ensure that codeArea class always appears, and add height and fontSize if provided
  let codeClasses = `codeArea ${themeClass}`;
  if (height && fontSize) {
    codeClasses += ` code-h-${height} ${fontSize}-rem`;
  } else if (height) {
    codeClasses += ` code-h-${height}`;
  }

  return <div className={codeClasses}>{children}</div>;
};

export default CodeSection;
