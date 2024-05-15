import React, { useState, useEffect, useRef, useMemo } from 'react';
import JHLogo from 'assets/JH-logo.svg';
import DarkStateToggle from 'components/DarkStateToggle';
import './TopAdBanner.scss';

interface TopAdBannerDataProps {
  menuItem: string;
  url: string;
}

const TopAdBannerData: TopAdBannerDataProps[] = [
  {
    menuItem: 'Home',
    url: '/',
  },
  {
    menuItem: 'Search',
    url: '/search',
  },
  {
    menuItem: 'Contact',
    url: '/contact',
  },
  {
    menuItem: 'Portfolio',
    url: '/portfolio',
  },
  {
    menuItem: 'Résumé',
    url: '/resume',
  },
  {
    menuItem: 'Blog',
    url: '/blog',
  },
];

const TopAdBanner: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (url: string) => {
    setActive(false); // Close the menu
    window.location.href = url; // Navigate to the URL
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActive(false);
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const items = useMemo(() => TopAdBannerData, []); // Memoize the menu items

  return (
    <div className="topAdBannerExpanded">
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container topAdBanner d-flex flex-row">
          <div className="topAdBanner__first d-flex align-items-center">
            <h1 className="p-0 m-0 d-flex align-items-center">
              <a
                aria-describedby="James Hernandez Website"
                className="d-flex align-items-center"
                href="/"
              >
                <JHLogo aria-labelledby="title" className="jhBannerLogo" />
              </a>
            </h1>
          </div>
          <nav
            className="adNav d-flex align-items-center"
            ref={menuRef}
            aria-label="Main"
          >
            <ul className="adNav__list">
              {items.map((item, index) => (
                <li className="d-inline-block" key={index} role="presentation">
                  <a
                    href={item.url}
                    role="menuitem"
                    onClick={() => handleMenuItemClick(item.url)}
                  >
                    {item.menuItem}
                  </a>
                </li>
              ))}
            </ul>
            <DarkStateToggle />
            <div className="adNavAnchor position-relative align-items-center">
              <button
                type="button"
                className={`hamburger hamburger--spin ${
                  isActive ? 'is-active' : ''
                }`}
                onClick={(e) => {
                  setActive(!isActive);
                  e.stopPropagation();
                }}
                aria-label="Show Navigation Menu"
                tabIndex={0}
                id="menubutton"
                aria-expanded={isActive}
                aria-controls="mobileMenu"
                aria-haspopup="true"
              >
                <div className="adNavHam hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </button>
              <ul
                className={`adNavDrop position-absolute list-unstyled user-select-none ${
                  isActive ? 'adNavDrop--show' : ''
                }`}
                id="mobileMenu"
                role="menu"
                aria-labelledby="menubutton"
                aria-label="website menu"
              >
                {items.map((item, index) => (
                  <li key={index} role="presentation">
                    <a
                      className="d-block"
                      href={item.url}
                      role="menuitem"
                      onClick={() => handleMenuItemClick(item.url)}
                    >
                      {item.menuItem}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopAdBanner;
