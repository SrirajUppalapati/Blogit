import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <AnimationWrapper>
      <div className="flex flex-col items-center justify-center h-screen gap-10">
        <div className="flex items-center justify-center">
          <span className="text-xl md:text-4xl font-mono">404</span>
          <span className="text-xl md:text-4xl font-mono tracking-widest pl-10">
            Page Not found
          </span>
        </div>
        <button
          className="mt-5 focus:ring:0 focus:border-0 hover:underline hover:underline-offset-8  hover:text-blue-800 dark:hover:text-blue-200 text-sm md:text-xl font-mono"
          onClick={() => navigate(-1)}
        >
          &larr; Go back to the previous page
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default PageNotFound;
