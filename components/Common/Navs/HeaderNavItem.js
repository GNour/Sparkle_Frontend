const HeaderNavItem = ({ text, isActive }) => {
  return (
    <li className="nav-item">
      <a
        className={`nav-link text-md ${isActive ? "active" : ""}`}
        data-bs-toggle="tab"
        href="#All-list"
        role="tab"
      >
        {text}
      </a>
    </li>
  );
};

export default HeaderNavItem;
