import IconText from "./IconText";

const Infolist = ({ title, list, externalStyles }) => {
  return (
    <div className={externalStyles}>
      <p className="mb-1">{title}</p>
      <div className="ms-2 fw-light">
        {list.map((item) => {
          return <IconText key={item.text} icon={item.icon} text={item.text} />;
        })}
      </div>
    </div>
  );
};

export default Infolist;
