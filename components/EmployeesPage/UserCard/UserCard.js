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
  action,
  id,
}) => {
  const handleOnClick = () => {
    action();
  };
  return (
    <div className={outerStyle} id={id} onClick={handleOnClick}>
      <div className={styles.container}>
        <div className={styles.bodyFlex}>
          <RoundedImageWithText
            text={imageText}
            image={image}
          ></RoundedImageWithText>
          <div className="border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
            <InfoText main={name} sub={`@${username}`} />
            <div className="d-flex flex-column">
              <IconText icon={<GoDeviceMobile />} text={phone} />
              <IconText icon={<HiOutlineMail />} text={email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
