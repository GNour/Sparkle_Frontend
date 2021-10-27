// Mainly used in cards, Check TaskCard.js
const InfoActionsFooter = ({ icons, actions }) => {
  return (
    <div className="row g-3 align-items-center">
      <div className="col-sm">
        <div className="d-flex align-items-center flex-wrap">{icons}</div>
      </div>
      <div className="d-flex justify-content-between">{actions}</div>
    </div>
  );
};

export default InfoActionsFooter;
