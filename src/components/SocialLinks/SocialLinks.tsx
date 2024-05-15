import FacebookSvg from 'assets/social/facebook.svg';
import TwitterXSvg from 'assets/social/x-twitter.svg';
import MastadonSvg from 'assets/social/mastadon.svg';

const SocialLinks: React.FC = () => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const openInNewTab = (dynamicUrl: any) => {
    window.open(
      dynamicUrl + url,
      '_blank',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600',
    );
  };

  const handleFBUrl = () => {
    const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
    openInNewTab(fbUrl);
  };
  const handleTwitterUrl = () => {
    const twitterUrl = 'https://twitter.com/share?url=';
    openInNewTab(twitterUrl);
  };
  const handleMastadonUrl = () => {
    const openMastodon = () => {
      openInNewTab(
        'https://' +
          localStorage.getItem('mastodon-instance') +
          '/share?text=' +
          encodeURIComponent(document.title) +
          '%0A' +
          url,
      );
    };
    if (localStorage.getItem('mastodon-instance')) {
      openMastodon();
    } else {
      let instance = window.prompt('Please tell me your Mastodon instance');
      if (instance) {
        localStorage.setItem('mastodon-instance', instance);
        openMastodon();
      }
    }
  };
  return (
    <div className="d-flex">
      <a href="#" title="Share on Facebook" onClick={handleFBUrl}>
        <FacebookSvg className="socialIcon regularIcon linkIcon" />
      </a>
      <a href="#" title="Share on Twitter" onClick={handleTwitterUrl}>
        <TwitterXSvg className="socialIcon regularIcon linkIcon" />
      </a>
      <a href="#" title="Share on Mastadon" onClick={handleMastadonUrl}>
        <MastadonSvg className="socialIcon regularIcon linkIcon" />
      </a>
    </div>
  );
};

export default SocialLinks;
