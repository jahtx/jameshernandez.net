/* CompBox component */
import React from 'react';
import { useTheme } from 'wrappers/AdvancedThemeContext';

type TechItem = {
  url: string;
  class: string;
};

type CompProps = {
  techItems?: string[]; // Assuming techItems is an array of strings
};

const CompBox: React.FC<CompProps> = ({ techItems }) => {
  const { isDarkMode } = useTheme(); // Use the isDarkMode value from the theme context

  const getClassNames = (item: string): string => {
    const lowerItem = item.toLowerCase();

    // Define the base class based on dark mode state
    const baseClass = 'techItem fsz-8 d-inline-block';

    // Check if the item matches any key in techData
    const matchedTech = Object.keys(techData).find((key) =>
      lowerItem.includes(key),
    );

    if (matchedTech) {
      const { class: specificClass } = techData[matchedTech];
      return `${baseClass} ${specificClass}`;
    }

    // Default class if no specific match
    return baseClass;
  };

  const containerClassName = isDarkMode
    ? 'dark-techItemsCont'
    : 'techItemsCont';

  return (
    <div className={containerClassName}>
      <ul className="d-inline-block p-0 m-0">
        {techItems?.map((item: string, index: number) => {
          const className = getClassNames(item);
          const matchedTech = Object.keys(techData).find((key) =>
            item.toLowerCase().includes(key),
          );
          const techInfo: TechItem | undefined = matchedTech
            ? techData[matchedTech]
            : undefined;

          return (
            <li className={className} key={index}>
              {techInfo ? (
                <a
                  href={techInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item}
                </a>
              ) : (
                item
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Tech data with URLs and corresponding classes
const techData: { [key: string]: TechItem } = {
  typescript: {
    url: 'https://www.typescriptlang.org/',
    class: 'techItem--typescript',
  },
  gatsby: {
    url: 'https://gatsbyjs.com',
    class: 'techItem--gatsby',
  },
  react: {
    url: 'https://react.dev',
    class: 'techItem--react',
  },
  node: {
    url: 'https://nodejs.org',
    class: 'techItem--node',
  },
  bootstrap: {
    url: 'https://getbootstrap.com',
    class: 'techItem--bootstrap',
  },
  hamburgers: {
    url: 'https://jonsuh.com/hamburgers/',
    class: 'techItem--hamburgers',
  },
  webpack: {
    url: 'https://webpack.js.org/',
    class: 'techItem--webpack',
  },
  // Add more tech items as needed
};

export default CompBox;
