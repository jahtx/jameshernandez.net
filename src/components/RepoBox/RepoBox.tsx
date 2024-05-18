import React from 'react';
import { useTheme } from 'wrappers/AdvancedThemeContext';
import './RepoBox.scss';

const RepoBox: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useTheme();

  const repoBoxClassName = isDarkMode ? 'dark-repoBox' : 'repoBox';
  return (
    <div className={`${repoBoxClassName} rounded`}>Github Repo: {children}</div>
  );
};

export default RepoBox;
