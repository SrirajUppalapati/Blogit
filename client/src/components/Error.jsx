import { Alert } from "flowbite-react";

function Error({ error }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[300px] flex justify-center items-center">
      <Alert color="failure" className="p-1 px-3">
        <span className="text-xs">{error}</span>
      </Alert>
    </div>
  );
}

export default Error;
