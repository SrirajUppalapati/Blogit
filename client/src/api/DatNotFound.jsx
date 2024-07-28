import { FaRegSadCry } from "react-icons/fa";

function DatNotFound({ query, type }) {
  return (
    <div className="flex pt-[10%] w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex justify-center items-center">
          <FaRegSadCry className="text-7xl dark:text-slate-400 text-slate-600" />
          <span className="text-3xl ml-4 dark:text-slate-400 text-slate-600">
            No {type} found with{" "}
            <p className="text-5xl italic inline dark:text-white text-black">
              '{query}'
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DatNotFound;
