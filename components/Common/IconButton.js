const IconButton = ({ icon, subIcon, action, styles, isSub }) => {
  return (
    <div className={styles} onClick={() => action(true)}>
      {isSub ? subIcon : icon}
    </div>
  );
};

export default IconButton;
