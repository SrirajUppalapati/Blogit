import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../Home/homeSlice";
import { useNavigate, useParams } from "react-router-dom";

function SearchTags() {
  const { tagsResult } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { query } = useParams();

  function handleTag(curr) {
    dispatch(changeFilter({ tag: curr }));
    navigate("/");
  }

  return (
    <div className="pl-5">
      <div className="flex justify-start items-center gap-2 pl-3 pb-5">
        <p className="font-light text-lg italic  capitalize flex flex-row justify-center items-center gap-3">
          Tags with <span className="text-xl font-extrabold">'{query}'</span>
        </p>
      </div>

      <div className="flex flex-wrap max-w-full gap-y-4">
        {tagsResult[0]?.tags.map((curr, index) => {
          return (
            <div
              onClick={() => handleTag(curr)}
              type="text"
              value={curr}
              className="mt-2 mx-2 bg-slate-100  rounded-xl hover:bg-opacity-50 hover:underline dark:bg-slate-800 text-black dark:text-slate-100 dark:hover:bg-slate-600 hover:bg-slate-50 cursor-pointer border-0 flex justify-center items-center gap-4"
              key={index}
            >
              <p className="italic capitalize whitespace-nowrap text-sm">
                {curr}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchTags;
