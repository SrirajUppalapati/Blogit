import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import Spinner from "../components/Spinner";

function PrivateRoute({ children }) {
  const { currentUser, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return currentUser && <AnimationWrapper>{children}</AnimationWrapper>;
}

export default PrivateRoute;
