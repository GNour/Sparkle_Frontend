import styles from "./Common.module.scss";
import IconButton from "./IconButton";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar = () => {
  return (
    <div
      className={`w-auto input-group mt-2 mt-sm-0 ms-0 ms-sm-2 input-group-md`}
    >
      <input className="form-control" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
