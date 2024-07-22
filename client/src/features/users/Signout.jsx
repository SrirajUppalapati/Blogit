import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "./authSlice";
import axios from "axios";
import toast from "react-hot-toast";

function Signout() {
  const dispatch = useDispatch();
  function handleSignout() {
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/signout`)
      .then(() => {
        dispatch(signoutSuccess());
        toast.success("Signout Successful!");
      })
      .catch((err) => console.error(err));
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
