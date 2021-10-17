import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaUsers, FaTasks, FaChalkboardTeacher } from "react-icons/fa";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { RiTodoLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import SideBarActionButton from "./SideBarActionButton";
import IconButton from "../IconButton";

const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [toggled, setToggled] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <Fragment>
      <IconButton
        styles="d-block fs-1 ms-2 mt-2 d-sm-none"
        icon={<GiHamburgerMenu />}
        subIcon={<AiOutlineClose />}
        isSub={toggled}
        action={handleToggleSidebar}
      />
      <ProSidebar
        breakPoint="sm"
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
          <SubMenu title="Employees" icon={<FaUsers />}>
            <MenuItem icon={<FaUsers />}>All Employees</MenuItem>
            <MenuItem icon={<AiOutlineTeam />}>Teams</MenuItem>
            <MenuItem icon={<AiOutlineCalendar />}>Attendance</MenuItem>
          </SubMenu>
          <SubMenu title="Tasks" icon={<FaTasks />}>
            <MenuItem icon={<FaTasks />}>All Tasks</MenuItem>
            <MenuItem icon={<FaChalkboardTeacher />}>Courses</MenuItem>
            <MenuItem icon={<RiTodoLine />}>Todos</MenuItem>
          </SubMenu>
        </Menu>
        <SidebarFooter style={{ textAlign: "center" }}>
          <SideBarActionButton
            text="Collapse"
            isCollapsed={menuCollapse}
            action={menuIconClick}
            icon={<FiArrowRightCircle />}
            subIcon={<FiArrowLeftCircle />}
          />
        </SidebarFooter>
      </ProSidebar>
    </Fragment>
  );
};

export default SideBar;
