import styles from "./RoundedImageWithText.module.scss";
import Image from "next/image";
const RoundedImageWithText = ({ image, text }) => {
  return (
    <div
      className={`pe-xl-4 pe-md-2 pe-sm-4 pe-0 text-center w220 mx-sm-0 mx-auto ${styles.container}`}
    >
      <Image
        src={image}
        className={`rounded-circle shadow-sm ${styles.img}`}
        alt="UserProfile"
        height="120"
        width="120"
      ></Image>
      <div className="d-flex align-items-center mt-3 justify-content-center flex-column">
        <h6 className="mb-0 fw-bold d-block fs-6">{text}</h6>
        <span className="text-muted small">Since: 2019-01-01</span>
      </div>
    </div>
  );
};

export default RoundedImageWithText;
