import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex items-center justify-center">
        <span className="text-5xl md:text-6xl font-mono">404</span>
        <span className="text-5xl md:text-6xl font-mono tracking-widest pl-10">
          Page Not found
        </span>
      </div>
      <button
        className="mt-20 focus:ring:0 focus:border-0 hover:underline hover:underline-offset-8 hover:text-3xl hover:text-blue-800 dark:hover:text-blue-200 text-2xl font-mono"
        onClick={() => navigate(-1)}
      >
        &larr; Go back to the previous page
      </button>
    </div>
  );
}

export default PageNotFound;
