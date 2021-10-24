import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import IconText from "./IconText";
const BackButton = ({ text }) => {
  const router = useRouter();
  return (
    <div className="d-inline cursor-pointer" onClick={() => router.back()}>
      <BiArrowBack className="text-lg me-1 text-muted" />
      <span className="text-muted">{text}</span>
    </div>
  );
};

export default BackButton;
