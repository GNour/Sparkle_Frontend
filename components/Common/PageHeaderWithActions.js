import styles from "./Common.module.scss";
import HeaderNav from "./Navs/HeaderNav";
import HeaderNavItem from "./Navs/HeaderNavItem";
import SearchBar from "./SearchBar";
const PageHeaderWithActions = ({
  header,
  haveNav,
  haveSearchBar,
  handleSearchBarAction,
  haveSubNav,
  button,
}) => {
  return (
    <div>
      <div className={styles.PageHeaderContainer}>
        <h3 className={`${styles.PageHeaderHeading} fw-bold py-2 mb-0`}>
          {header}
        </h3>
        <div className={`d-flex py-2 align-items-end flex-wrap`}>
          {button ? button : null}
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
          {haveSearchBar ? (
            <SearchBar handleSearch={handleSearchBarAction} />
          ) : (
            ""
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PageHeaderWithActions;
