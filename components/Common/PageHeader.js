import styles from "./Common.module.scss";
const PageHeader = ({ header }) => {
  return (
    <div>
      <h3 className={`${styles.PageHeader} fw-bold py-2 mb-0`}>{header}</h3>
      <hr />
    </div>
  );
};

export default PageHeader;
