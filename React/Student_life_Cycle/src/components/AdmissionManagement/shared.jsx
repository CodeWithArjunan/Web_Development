
export function PageHeading({ title, crumb, subtitle, children, actions }) {
  return (
    <div className="page-heading">
      <div>
        <div className="crumb">
          OPERATIONS <b>›</b> {crumb || String(title).toUpperCase()}
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {(children || actions) && (
        <div className="heading-actions">{children || actions}</div>
      )}
    </div>
  );
}

export function Table({ headers, children }) {
  return (
    <div className="panel table-panel">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

