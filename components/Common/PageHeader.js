import styles from "./Common.module.scss";
const PageHeader = ({ header, subtitle }) => {
  return (
    <div>
      <div>
        <h3 className={`${styles.PageHeader} fw-bold py-2 mb-0 d-inline-block`}>
          {header}
        </h3>
        <h5 className="fw-light float-end">{subtitle}</h5>
      </div>

      <hr />
    </div>
  );
};

export default PageHeader;
