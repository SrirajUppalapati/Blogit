import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "./authSlice";
import toast from "react-hot-toast";

function Oauth() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  async function handleGoogleClick() {
    dispatch(signInWithGoogle()).then((data) => {
      if (data.payload) {
        toast.success("SignIn with google successful!");
      } else {
        toast.error("Unable to signin with google!");
      }
    });
  }
  return (
    <Button
      className="center focus:ring-0"
      color={theme === "dark" ? "cyan" : "dark"}
      onClick={handleGoogleClick}
    >
      <span className="pt-1 mr-3">Continue with google</span>
      <FcGoogle className="text-3xl" />
    </Button>
  );
}

export default Oauth;
