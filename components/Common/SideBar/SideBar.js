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
  AiOutlineClose,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FaUsers, FaTasks } from "react-icons/fa";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import SideBarActionButton from "./SideBarActionButton";
import IconButton from "../IconButton";
import styles from "./SideBar.module.scss";
import { useAuth } from "../../../stores/AuthContext";
import { BiLogOut } from "react-icons/bi";
const SideBar = ({ router }) => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [toggled, setToggled] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const { user, logout } = useAuth();
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
              height="50"
              width="50"
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
          <MenuItem
            active={
              router.asPath == "/" || router.asPath == `/employees/${user.id}`
                ? true
                : false
            }
            icon={<AiOutlineDashboard size={18} />}
          >
            {user.role == "Admin" ? (
              <Link href="/">DashBoard</Link>
            ) : (
              <Link href={`/employees/${user.id}`}>My Dashboard</Link>
            )}
          </MenuItem>
          {user.role == "Admin" ? (
            <SubMenu title="Employees" icon={<FaUsers size={18} />}>
              <MenuItem
                active={router.asPath == "/employees" ? true : false}
                icon={<FaUsers size={18} />}
              >
                <Link href="/employees">All Employees</Link>
              </MenuItem>
              <MenuItem
                active={router.asPath == "/teams" ? true : false}
                icon={<AiOutlineTeam size={18} />}
              >
                <Link href="/teams">Teams</Link>
              </MenuItem>
            </SubMenu>
          ) : null}

          <MenuItem
            active={router.asPath == "/tasks" ? true : false}
            icon={<FaTasks size={18} />}
          >
            <Link href="/tasks">Tasks</Link>
          </MenuItem>
          {user.role == "Admin" ? (
            <MenuItem
              active={router.asPath.startsWith("/courses") ? true : false}
              icon={<GiTeacher size={18} />}
            >
              <Link href="/courses">Courses</Link>
            </MenuItem>
          ) : null}
          <MenuItem
            active={router.asPath == "/chat" ? true : false}
            icon={<BsChatDots size={18} />}
          >
            <Link href="/chat">Chat</Link>
          </MenuItem>
        </Menu>
        <SidebarFooter style={{ textAlign: "center" }}>
          <SideBarActionButton
            text="Logout"
            isCollapsed={menuCollapse}
            action={logout}
            icon={<BiLogOut size={18} />}
            subIcon={<BiLogOut size={18} />}
          />
          <SideBarActionButton
            isCollapsed={menuCollapse}
            action={menuIconClick}
            icon={<FiArrowRightCircle size={20} />}
            subIcon={<FiArrowLeftCircle size={20} />}
          />
        </SidebarFooter>
      </ProSidebar>
    </Fragment>
  );
};

export default SideBar;
