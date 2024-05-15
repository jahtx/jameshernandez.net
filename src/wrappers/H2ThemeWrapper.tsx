function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}
const H2ThemeWrapper = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;
  return (
    <h2 className="remark__h2 mt-4" id={anchor}>
      <a href={link}>§ &nbsp;</a>
      {children}
    </h2>
  );
};
export default H2ThemeWrapper;
