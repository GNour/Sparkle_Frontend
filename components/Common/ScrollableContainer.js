import React from "react";

const ScrollableContainer = ({ children, externalStyles, header, button }) => {
  return (
    <div className={`${externalStyles} p-2`}>
      <h5 className="fw-light p-1 d-inline">{header}</h5>
      {button}
      {header ? <hr /> : null}
      <div>{children ? children : <h6>Nothing added yet...</h6>}</div>
    </div>
  );
};

export default ScrollableContainer;
