const IconText = ({ icon, text }) => {
  return (
    <div className="d-flex align-items-center">
      {icon}
      <span className="ms-2 small">{text}</span>
    </div>
  );
};

export default IconText;
