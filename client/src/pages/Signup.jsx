import { useSelector } from "react-redux";
import AnimationWrapper from "../components/AnimationWrapper";
import SignupForm from "../features/users/SignupForm";
import { Navigate } from "react-router-dom";
import Header from "../features/Header/Header";

function Signup() {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper>
      <Header />
      <div className="flex flex-col items-center pt-28 justify-center">
        <h1 className="text-5xl capitalize text-center mb-16 font-medium tracking-wide">
          Join Us Today!
        </h1>
        <SignupForm />
      </div>
    </AnimationWrapper>
  );
}

export default Signup;
