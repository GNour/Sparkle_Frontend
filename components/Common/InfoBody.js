// Mainly used in Cards, check TaskCard.js
const InfoBody = ({ cornerText, title, subTitle, body }) => {
  return (
    <div>
      <p className={`float-end ps-1 fw-light text-sm mb-0 text-muted`}>
        {cornerText}
      </p>
      <h6 className="pe-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
        {title}
      </h6>
      <p className="text-sm text-muted">{subTitle}</p>
      <p className="py-1 mb-0 text-md">{body}</p>
    </div>
  );
};

export default InfoBody;
