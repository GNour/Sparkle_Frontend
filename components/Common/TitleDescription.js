const TitleDescription = ({ title, description }) => {
  return (
    <div>
      <h6 className="text-capitalize p-1">{title}</h6>
      <p className="text-sm fw-light">{description}</p>
      <hr />
    </div>
  );
};

export default TitleDescription;
