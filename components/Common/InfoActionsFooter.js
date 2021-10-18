// Mainly used in cards, Check TaskCard.js
const InfoActionsFooter = ({ icons, actions }) => {
  return (
    <div className="row g-3 align-items-center">
      <div className="col-sm">
        <div className="d-flex align-items-center flex-wrap">{icons}</div>
      </div>
      <div className="col-sm text-end">{actions}</div>
    </div>
  );
};

export default InfoActionsFooter;
