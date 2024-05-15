import type { HeadFC } from 'gatsby';
import { useSiteMetadata } from 'hooks/use-site-metadata';

export const Head: HeadFC = () => {
  const {
    title,
    tagline,
    author,
    keywords,
    description,
    cacheControl,
    robots,
  } = useSiteMetadata();

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="cache-control" content={cacheControl} />
      <meta name="author" content={author.name} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="AdsBot-Google" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/bootstrap.min.css" />
      {/* <link rel="stylesheet" href="/hamburgers.min.css" /> */}
      <title>
        {title} | {tagline}
      </title>
    </>
  );
};
