import RSSLogo from 'assets/rss-logo-complex.svg';
import { useSiteMetadata } from 'hooks/use-site-metadata';
import { getDate } from 'hooks/get-date';
import MastadonSvg from 'assets/social/mastadon.svg';
import TwitterXSvg from 'assets/social/x-twitter.svg';
import GithubSvg from 'assets/github-logo.svg';
import LinkedInSvg from 'assets/linkedin-icon.svg';
import './UpsilonFooter.scss';

interface FooterDataProps {
  menuItem: string;
  url: string;
}

const FooterData = [
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

export const UpsilonFooter = () => {
  const { copyrightHolder } = useSiteMetadata();
  const { currentBuildDate } = getDate();
  const items = FooterData;
  const currentYear = currentBuildDate.currentDate;

  return (
    <div className="footerBack w-100 mt-auto">
      <div className="specialFooter-container-sm w-100 mx-auto">
        <div className="specialFooter-container-sm__spacer"></div>
        <footer className="upsilonFooter d-flex mx-auto">
          <nav className="upsilonFooter__first" aria-label="Footer">
            <ul className="list-unstyled" id="menu" role="menu">
              {items.map((item: FooterDataProps, index: number) => {
                const { menuItem, url } = item;
                return (
                  <li
                    key={index}
                    className="text-decoration-none"
                    role="presentation"
                  >
                    <a href={url} role="menuitem">
                      {menuItem}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="d-flex flex-column justify-content-center">
            <div className="socialSection">
              <a
                href="https://www.linkedin.com/in/jameshernandez/"
                target="_blank"
              >
                <span className="visually-hidden">Linked In</span>
                <LinkedInSvg
                  className="footerSocialIcon"
                  role="img"
                  aria-hidden="true"
                />
              </a>
              <a href="https://github.com/jahtx" target="_blank">
                <span className="visually-hidden">Github</span>
                <GithubSvg
                  className="githubSocialIcon"
                  role="img"
                  aria-hidden="true"
                />
              </a>
              <a href="https://twitter.com/jah_uxdev" target="_blank">
                <span className="visually-hidden">X Media Account</span>
                <TwitterXSvg
                  className="footerSocialIcon"
                  role="img"
                  aria-hidden="true"
                />
              </a>
              <a href="https://mastodon.social/@jameshernandez" target="_blank">
                <span className="visually-hidden">Mastadon Account</span>
                <MastadonSvg
                  className="footerSocialIcon"
                  role="img"
                  aria-hidden="true"
                />
              </a>
            </div>
            <div className="rssCopyrightSection">
              <a href="/rss.xml" className="d-block" target="_blank">
                <span className="visually-hidden">RSS Feed</span>
                <RSSLogo className="rssLogoAvd" role="img" aria-hidden="true" />
              </a>
              <small className="rssCopyrightSection__rights fsz-7 d-block">
                Copyright © {currentYear}, {copyrightHolder}
              </small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UpsilonFooter;
