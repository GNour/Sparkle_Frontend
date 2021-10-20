import IconText from "../../Common/IconText";
import RoundedImageWithText from "../../Common/Images/RoundedImageWithText/RoundedImageWithText";
import InfoText from "../../Common/InfoText";
import styles from "./UserCard.module.scss";
import { GoDeviceMobile } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
const UserCard = ({
  image,
  imageText,
  name,
  username,
  phone,
  email,
  outerStyle,
}) => {
  return (
    <div className={outerStyle}>
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
    </div>
  );
};

export default UserCard;