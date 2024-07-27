import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchUser } from "./searchSlice";

function SearchUsers() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const [check, setCheck] = useState(false);

  useEffect(
    function () {
      dispatch(searchUser({ query })).then(({ payload }) => {
        if (payload.data.length === 0) {
          setCheck(true);
        }
      });
    },
    [dispatch, query]
  );

  if (check) {
    return <div>No data</div>;
  }
  return <div>Users</div>;
}

export default SearchUsers;
