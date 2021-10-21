import { Fragment } from "react";
import PageHeader from "../../Common/PageHeader";

const CourseLayout = ({ children }) => {
  return (
    <Fragment>
      <PageHeader header="Course Title" />
      <div className="row g-3 gy-5 py-3 row-deck">{children}</div>
    </Fragment>
  );
};

export default CourseLayout;
