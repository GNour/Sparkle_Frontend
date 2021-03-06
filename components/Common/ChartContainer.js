const ChartContainer = ({ header, externalStyles, children }) => {
  return (
    <div className={externalStyles}>
      <h6 className="py-1 mb-0">{header}</h6>
      {header ? <hr /> : null}
      <div>{children}</div>
    </div>
  );
};

export default ChartContainer;
