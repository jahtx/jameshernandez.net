import { ImageQuery } from './ImageQuery';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import './TechMiniCard.scss';

const technologyData = {
  Angular: {
    image: 'angLogo',
    weblink: 'https://angular.io/',
    altText: 'Angular 2',
  },
  AngularJS: {
    image: 'angjsLogo',
    weblink: 'https://angularjs.org/',
    altText: 'AngularJS',
  },
  RXJS: {
    image: 'rxjsLogo',
    weblink: 'http://reactivex.io/',
    altText: 'RXJS',
  },
  Bootstrap: {
    image: 'bootstrapLogo',
    weblink: 'https://getbootstrap.com/',
    altText: 'Bootstrap',
  },
  React: {
    image: 'reactLogo',
    weblink: 'https://reactjs.org',
    altText: 'React',
  },
  Redux: {
    image: 'reduxLogo',
    weblink: 'https://redux.js.org/',
    altText: 'Redux',
  },
  Gitlab: {
    image: 'gitlabLogo',
    weblink: 'https://about.gitlab.com/',
    altText: 'Gitlab',
  },
  JQuery: {
    image: 'jqueryLogo',
    weblink: 'https://jquery.com/',
    altText: 'JQuery',
  },
  HTML5: {
    image: 'html5Logo',
    weblink: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
    altText: 'HTML5',
  },
  CSS3: {
    image: 'css3Logo',
    weblink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    altText: 'CSS3',
  },
  SASS: {
    image: 'sassLogo',
    weblink: 'https://sass-lang.com/',
    altText: 'SASS',
  },
  WordPress: {
    image: 'wpLogo',
    weblink: 'https://wordpress.org',
    altText: 'WordPress',
  },
  Linux: {
    image: 'linuxLogo',
    weblink: 'https://linuxfoundation.org/',
    altText: 'Linux',
  },
  GraphQL: {
    image: 'graphqlLogo',
    weblink: 'https://graphql.org/',
    altText: 'GraphQL',
  },
  JavaScript: {
    image: 'jsLogo',
    weblink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    altText: 'JavaScript',
  },
  YUI: {
    image: 'yuiLogo',
    weblink: 'https://clarle.github.io/yui3/',
    altText: 'YUI Library',
  },
  TypeScript: {
    image: 'typescriptLogo',
    weblink: 'https://www.typescriptlang.org/',
    altText: 'TypeScript',
  },
  Docker: {
    image: 'dockerLogo',
    weblink: 'https://www.ibm.com/cloud/learn/docker',
    altText: 'Docker',
  },
  Cesium: {
    image: 'cesiumLogo',
    weblink: 'https://cesium.com/',
    altText: 'Cesium',
  },
  Figma: {
    image: 'figmaLogo',
    weblink: 'https://figma.com/',
    altText: 'Figma',
  },
  Sketch: {
    image: 'sketchLogo',
    weblink: 'https://sketch.com/',
    altText: 'Sketch',
  },
  Zeplin: {
    image: 'zeplinLogo',
    weblink: 'https://zeplin.io/',
    altText: 'Zeplin',
  },
  MUI: {
    image: 'muiLogo',
    weblink: 'https://mui.com/',
    altText: 'MUI',
  },
};

const TechMiniCard = ({ tech }) => {
  const data = ImageQuery();
  const techData = technologyData[tech] || {
    image: 'whammyDude',
    weblink: 'https://en.wikipedia.org/wiki/Whammy',
    altText: 'Whammy',
  };

  return (
    <div className="techCard d-flex flex-column justify-content-end">
      <a
        href={techData.weblink}
        target="_blank"
        rel="noopener noreferrer"
        className="d-flex justify-content-center"
      >
        <div className="d-flex justify-content-center">
          <div className="techCard__icon d-flex justify-content-center">
            <GatsbyImage
              image={getImage(data[techData.image])}
              alt={techData.altText}
            />
          </div>
        </div>
      </a>
      <div className="fsz-6 d-flex justify-content-center">{tech}</div>
    </div>
  );
};

export default TechMiniCard;
