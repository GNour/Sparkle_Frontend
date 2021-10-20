import styles from "./Common.module.scss";
import ActionButtonWithIcon from "./Buttons/ActionButtonWithIcon";
import { BsFilter } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderNav from "./Navs/HeaderNav";
import HeaderNavItem from "./Navs/HeaderNavItem";
import SearchBar from "./SearchBar";
const PageHeader = ({
  header,
  haveNav,
  haveSearchBar,
  haveSubNav,
  handleModalOpen,
}) => {
  return (
    <div>
      <div className={styles.PageHeaderContainer}>
        <h3 className={`${styles.PageHeaderHeading} fw-bold py-2 mb-0`}>
          {header}
        </h3>
        <div className={`d-flex py-2 align-items-end flex-wrap`}>
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            text="Create"
            action={handleModalOpen}
          />
          {haveNav ? (
            <HeaderNav>
              {haveNav.map((item, index) => {
                return (
                  <HeaderNavItem
                    key={index}
                    text={item}
                    isActive={index == 0 ? true : false}
                  />
                );
              })}
            </HeaderNav>
          ) : (
            ""
          )}
          {haveSubNav ? (
            <HeaderNav>
              {haveSubNav.map((item, index) => {
                return (
                  <HeaderNavItem
                    key={index}
                    text={item}
                    isActive={index == 0 ? true : false}
                  />
                );
              })}
            </HeaderNav>
          ) : (
            ""
          )}
          {haveSearchBar ? <SearchBar /> : ""}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PageHeader;
