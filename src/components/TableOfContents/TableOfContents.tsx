interface TableOfContentsProps {
  tableOfContents: { title: string; anchor: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
}) => {
  return (
    <div className="tableOfContents mt-4 rounded">
      <h2>Table of Contents</h2>
      <ul>
        {tableOfContents.map((item) => (
          <li key={item.anchor}>
            <a href={`#${item.anchor}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
