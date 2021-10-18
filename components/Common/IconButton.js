// This button can be used for setting a prop to true i.e(Models, CollapseSideBar...)
const IconButton = ({ icon, subIcon, action, styles, isSub, text }) => {
  return (
    <div className={styles} onClick={() => action(true)}>
      {isSub ? subIcon : icon}
      {text}
    </div>
  );
};

export default IconButton;
