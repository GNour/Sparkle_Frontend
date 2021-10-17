import IconText from "../../IconText";
import RoundedImageWithText from "../../Images/RoundedImageWithText/RoundedImageWithText";
import InfoText from "../../InfoText";
import styles from "./UserCard.module.scss";
import { GoDeviceMobile } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
const UserCard = ({ image, imageText, name, username, phone, email }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bodyFlex}>
        <RoundedImageWithText
          text="Waiter"
          image="/id_img.jpg"
        ></RoundedImageWithText>
        <div className="border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
          <InfoText main={"Ghyath noureddine"} sub={"@ghyath"} />
          <div className="d-flex flex-column">
            <IconText icon={<GoDeviceMobile />} text={"+961 70909080"} />
            <IconText icon={<HiOutlineMail />} text={"example@gmail.com"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
