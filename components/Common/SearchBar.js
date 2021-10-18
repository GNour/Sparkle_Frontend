import styles from "./Common.module.scss";
import IconButton from "./IconButton";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar = () => {
  return (
    <div className="input-group w-auto ms-2 input-group-md">
      <input className="form-control" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
