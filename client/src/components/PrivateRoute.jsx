import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!currentUser) {
        navigate("/signin");
      }
    },
    [currentUser, navigate]
  );

  if (currentUser) {
    return children;
  }
}

export default PrivateRoute;
