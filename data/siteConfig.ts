export type mainSiteMetaData = {
  title: string;
  tagline: string;
  description: string;
  keywords: string;
  author: {
    name: string;
  };
  social: {
    twitter: string;
  };
  siteRss: string;
  siteRssTitle: string;
  siteUrl: string;
  cacheControl: string;
  robots: string;
  tagsName: string;
  tagsNamePlural: string;
  blogListPath: string;
  postPath?: string;
  copyrightHolder: string;
  defaultPostsPerPage: number;
  googleAnalyticsID: string;
};

const siteConfig: mainSiteMetaData = {
  title: 'James Hernandez',
  tagline: 'Sr User Experience Designer',
  keywords:
    'ux, user experience, user interface, figma, design, development, react, javascript, gatsby',
  author: {
    name: 'James A. Hernandez',
  },
  siteUrl: 'https://jameshernandez.net',
  description: 'User Experience Design',
  social: {
    twitter: 'hernandezjames',
  },
  siteRss: '/rss.xml',
  siteRssTitle: 'JamesHernandez RSS feed',
  cacheControl: 'public, max-age=0, must-revalidate',
  robots: 'index',
  blogListPath: 'blog',
  postPath: 'article',
  tagsName: 'tag',
  tagsNamePlural: 'tags',
  copyrightHolder: 'James Hernandez',
  defaultPostsPerPage: 3,
  googleAnalyticsID: 'G-200DREXMJT',
};

export default siteConfig;
