import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Fragment, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaUsers, FaTasks } from "react-icons/fa";
import {
  FiArrowRightCircle,
  FiArrowLeftCircle,
  FiLogOut,
} from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import SideBarActionButton from "./SideBarActionButton";
import IconButton from "../IconButton";
import styles from "./SideBar.module.scss";
import { useAuth } from "../../../stores/AuthContext";
const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { user, logout } = useAuth();
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <Fragment>
      <IconButton
        styles={`${styles.toggle} d-block fs-1 me-3 mt-2 d-md-none`}
        icon={<GiHamburgerMenu />}
        subIcon={<AiOutlineClose />}
        isSub={toggled}
        action={handleToggleSidebar}
      />
      <ProSidebar
        breakPoint="md"
        toggled={toggled}
        onToggle={handleToggleSidebar}
        collapsed={menuCollapse}
      >
        <SidebarHeader>
          {menuCollapse ? (
            <Image
              src="/logoSmall.png"
              height="75"
              width="75"
              layout="intrinsic"
              alt="LOGO"
              quality="100"
            />
          ) : (
            <Image
              src="/logoBig.png"
              height="75"
              width="112"
              layout="fixed"
              alt="LOGO"
              quality="100"
            />
          )}
        </SidebarHeader>
        <Menu iconShape="rounded">
          <MenuItem icon={<AiOutlineDashboard />}>
            <Link href="/">Dashboard</Link>
          </MenuItem>
          {user?.user.role == "Admin" ? (
            <SubMenu title="Employees" icon={<FaUsers />}>
              <MenuItem icon={<FaUsers />}>
                <Link href="/employees">All Employees</Link>
              </MenuItem>
              <MenuItem icon={<AiOutlineTeam />}>
                <Link href="/teams">Teams</Link>
              </MenuItem>
            </SubMenu>
          ) : null}

          <MenuItem icon={<FaTasks />}>
            <Link href="/tasks">Tasks</Link>
          </MenuItem>
        </Menu>
        <SidebarFooter style={{ textAlign: "center" }}>
          <SideBarActionButton
            text="Collapse"
            isCollapsed={menuCollapse}
            action={menuIconClick}
            icon={<FiArrowRightCircle />}
            subIcon={<FiArrowLeftCircle />}
          />
          <SideBarActionButton
            text="Logout"
            isCollapsed={menuCollapse}
            action={logout}
            icon={<FiLogOut />}
            subIcon={<FiLogOut />}
          />
        </SidebarFooter>
      </ProSidebar>
    </Fragment>
  );
};

export default SideBar;
