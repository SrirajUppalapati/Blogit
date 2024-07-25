import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "./homeSlice";

function FilterTags({ tag, count, className, fontSize }) {
  const { filter } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  function handleTag(tag, e) {
    e.preventDefault();
    if (filter?.tag === tag) {
      dispatch(changeFilter(null));
    } else {
      dispatch(changeFilter({ tag, count }));
    }
  }

  return (
    <div
      onClick={(e) => handleTag(tag, e)}
      type="text"
      value={tag}
      className={`${className} ${
        filter?.tag === tag && count > 0 && "underline"
      }`}
    >
      <p className={`${fontSize ? fontSize : "text-sm"} italic capitalize`}>
        {tag}
      </p>
      {count && <p className="underline-offset-4 text-xs">{count}</p>}
    </div>
  );
}

export default FilterTags;
