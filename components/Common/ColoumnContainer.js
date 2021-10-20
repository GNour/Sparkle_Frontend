const ColoumnContainer = ({ title, children }) => {
  return (
    <div className="col-xxl-4 p-2 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
      <h5 className="mb-2">{title}</h5>
      {children}
    </div>
  );
};

export default ColoumnContainer;
