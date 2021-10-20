import { Modal } from "@material-ui/core";
const CustomModal = ({ children, modalClose, isModalOpened }) => {
  const handleClose = () => {
    modalClose();
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isModalOpened}
      onClose={handleClose}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
