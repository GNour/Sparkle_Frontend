const IconText = ({ icon, text, style }) => {
  return (
    <div className={`${style} d-flex align-items-center`}>
      {icon}
      <span className="ms-2 small">{text}</span>
    </div>
  );
};

export default IconText;
