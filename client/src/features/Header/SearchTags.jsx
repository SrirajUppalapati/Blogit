import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchTag } from "./searchSlice";
import { useDispatch } from "react-redux";
function SearchTags() {
  const dispatch = useDispatch();
  const { query } = useParams();

  const [check, setCheck] = useState(false);

  useEffect(
    function () {
      dispatch(searchTag({ query })).then(({ payload }) => {
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
  return <div>Tags</div>;
}

export default SearchTags;
