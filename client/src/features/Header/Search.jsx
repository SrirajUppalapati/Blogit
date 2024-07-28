import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Search() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleKeyDown(e) {
    const query = e.target.value;
    if (e.code === "Enter" && query.length >= 3) {
      navigate(`/search/${query}`);
    }
    if (e.code === "Escape") {
      setText("");
      navigate("/");
    }
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <div className="flex justify-center items-center text-slate-700 dark:text-slate-400 bg-inherit dark:border-slate-700 dark:bg-slate-800 focus:ring-slate-300 focus:border-slate-600 p-[0.4rem] rounded-full hover:ring-2 hover:ring-slate-200 md:hidden">
        <button onClick={() => setShow(!show)}>
          <MdSearch className="text-xl" />
        </button>
      </div>
      <div className="mt-2 px-4 absolute w-full top-full md:inset-0 md:left-[10%] md:top-[7%] lg:left-[7%] md:w-fit">
        <input
          type="text"
          placeholder="Search"
          className={`rounded-3xl border-slate-300 text-black bg-inherit dark:border-slate-700 dark:bg-slate-700 focus:ring-slate-200 focus:border-slate-400 text-sm md:w-auto w-full md:block dark:text-slate-50 ${
            !show && "hidden"
          }`}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}

export default Search;
