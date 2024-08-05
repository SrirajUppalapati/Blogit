import { PiMaskSadDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

function NoDataFound() {
  return (
    <div className="flex flex-col justify-center items-center pt-40 gap-10">
      <div>
        <PiMaskSadDuotone className="text-[8rem]" />
      </div>
      <p className="text-3xl italic">No data Found</p>
      <Link
        to="/write"
        className="dark:text-blue-400 text-blue-600 hover:underline hover:underline-offset-2 text-center"
      >
        Click here to start Writing
      </Link>
    </div>
  );
}

export default NoDataFound;
