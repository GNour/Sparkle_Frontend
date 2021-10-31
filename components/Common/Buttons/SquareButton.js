const SquareButton = ({ icon, text, handleAction }) => {
  return (
    <div
      className="rounded d-flex border flex-column cursor-pointer hover-up text-center custom-container-primary"
      onClick={handleAction}
    >
      <div className="m-2 m-sm-5 mb-3 color-white">{icon}</div>
      <div className="mb-2 text-uppercase fw-bold color-white">{text}</div>
    </div>
  );
};

export default SquareButton;
