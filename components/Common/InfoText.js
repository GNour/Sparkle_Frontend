const InfoText = ({ main, sub }) => {
  return (
    <div className="mb-3">
      <h6 className="mb-0 mt-2 fw-bold d-block fs-4">{main}</h6>
      <span className="py-1 fw-light fs-6 mb-0 mt-1 text-muted">{sub}</span>
    </div>
  );
};

export default InfoText;
