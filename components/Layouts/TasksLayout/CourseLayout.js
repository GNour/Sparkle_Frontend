import { Fragment } from "react";
import PageHeader from "../../Common/PageHeader";

const CourseLayout = ({ children, title, grade }) => {
  return (
    <Fragment>
      <PageHeader header={title} subtitle={grade} />
      <div className="row g-3 gy-5 py-3 w-100">{children}</div>
    </Fragment>
  );
};

export default CourseLayout;
