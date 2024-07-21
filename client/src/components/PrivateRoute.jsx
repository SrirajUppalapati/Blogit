import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  // If currentUser is available, render children
  return currentUser ? <>{children}</> : null; // Use a fragment to ensure valid JSX return
}

export default PrivateRoute;
