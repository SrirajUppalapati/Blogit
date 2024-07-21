import { useSelector } from "react-redux";
import AnimationWrapper from "../components/AnimationWrapper";
import SigninForm from "../features/users/SigninForm";
import { Navigate } from "react-router-dom";
import Header from "../features/Header/Header";
function Signin() {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper>
      <Header />
      <div className="flex flex-col items-center pt-40 justify-center min-h-screen">
        <h1 className="text-5xl capitalize text-center mb-16 font-medium tracking-wide">
          Welcome back!
        </h1>
        <SigninForm />
      </div>
    </AnimationWrapper>
  );
}

export default Signin;
