import { useState } from "react";
import { MdSearch } from "react-icons/md";

function Search() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center border-slate-300 text-slate-500 dark:text-slate-400 bg-inherit dark:border-slate-600 dark:bg-slate-700 focus:ring-slate-200 focus:border-slate-400 p-[0.4rem] rounded-full  border-[1px] hover:ring-2 hover:ring-slate-200 md:hidden">
        <button onClick={() => setShow(!show)}>
          <MdSearch className="text-xl" />
        </button>
      </div>
      <div className=" mt-2 px-4 absolute w-full top-full md:inset-0 md:left-[10%] md:top-[7%] md:w-fit">
        <input
          type="text"
          placeholder="Search"
          className={`rounded-3xl border-slate-300 text-black bg-inherit dark:border-slate-600 dark:bg-slate-700 focus:ring-slate-200 focus:border-slate-400 text-sm md:w-auto w-full md:block dark:text-slate-50 ${
            !show && "hidden"
          } `}
        />
      </div>
    </>
  );
}

export default Search;
