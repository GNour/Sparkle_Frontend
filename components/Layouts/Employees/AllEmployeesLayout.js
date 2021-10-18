const AllEmployeesLayout = ({ children }) => {
  return (
    <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
      {children}
    </div>
  );
};

export default AllEmployeesLayout;
