import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signinSuccess } from "./authSlice";
import { useNavigate } from "react-router-dom";

function Oauth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  async function handleGoogleClick() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resFromGoogle = await signInWithPopup(auth, provider);
      const data = {
        name: resFromGoogle.user.displayName,
        email: resFromGoogle.user.email,
        profilePicture: resFromGoogle.user.photoURL,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/users/google`, data)
        .then(({ data }) => {
          console.log("Succesful signin");
          console.log(data.data);
          dispatch(signinSuccess(data.data));
          navigate("/");
        });
    } catch (err) {
      console.log("test");
      console.error(err);
    }
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
