import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutUser } from "./authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSignout() {
    dispatch(signOutUser()).then((data) => {
      if (data.payload) {
        navigate("/");
        toast.success("Signout successful!");
      } else {
        toast.error(data.error);
      }
    });
  }
  return (
    <span
      onClick={handleSignout}
      className="flex justify-center items-center gap-x-1 text-xs"
    >
      <FaSignOutAlt className="text-sm" />
      Signout
    </span>
  );
}

export default Signout;
