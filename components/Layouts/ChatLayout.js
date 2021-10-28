import { Fragment } from "react";
import PageHeader from "../Common/PageHeader";
const ChatLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="row g-3 gy-5 py-3 row-deck">{children}</div>
    </Fragment>
  );
};

export default ChatLayout;
