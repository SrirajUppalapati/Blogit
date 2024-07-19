import { useSelector } from "react-redux";
import AnimationWrapper from "../components/AnimationWrapper";
import SignupForm from "../features/users/SignupForm";
import { Navigate } from "react-router-dom";

function Signup() {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper>
      <div className="h-cover flex flex-col items-center mt-20 justify-center mb-10">
        <h1 className="text-5xl capitalize text-center mb-16 font-medium tracking-wide">
          Join Us Today!
        </h1>
        <SignupForm />
      </div>
    </AnimationWrapper>
  );
}

export default Signup;
