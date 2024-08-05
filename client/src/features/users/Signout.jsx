import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "./authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  function handleSignout() {
    dispatch(signOutUser()).then((data) => {
      if (data.payload) {
        navigate("/");
        toast.success("Signout successful!");
      } else {
        toast.error(data?.error);
      }
    });
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <button
      onClick={handleSignout}
      className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
    >
      <FaSignOutAlt className="text-sm" />
      Signout
    </button>
  );
}

export default Signout;
