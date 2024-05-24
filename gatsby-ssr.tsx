// Adds a class name to the body element
exports.onRenderBody = ({ setBodyAttributes, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
  // setBodyAttributes({
  //   className: 'dark',
  // });
};
