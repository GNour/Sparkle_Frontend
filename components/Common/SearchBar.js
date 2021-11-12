const SearchBar = ({ handleSearch }) => {
  return (
    <div
      className={`w-auto input-group mt-2 mt-sm-0 ms-0 ms-sm-2 input-group-md`}
      onChange={(e) => handleSearch(e.target.value)}
    >
      <input className="form-control" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
