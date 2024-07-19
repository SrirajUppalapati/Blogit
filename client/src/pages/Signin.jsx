import { useSelector } from "react-redux";
import AnimationWrapper from "../components/AnimationWrapper";
import SigninForm from "../features/users/Signinform";
import { Navigate } from "react-router-dom";

function Signin() {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper>
      <div className="h-cover flex flex-col items-center mt-28 justify-center mb-10">
        <h1 className="text-5xl capitalize text-center mb-16 font-medium tracking-wide">
          Welcome back!
        </h1>
        <SigninForm />
      </div>
    </AnimationWrapper>
  );
}

export default Signin;
