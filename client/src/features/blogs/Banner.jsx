import { FileInput, Label, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBanner } from "./blogSlice";

function Banner() {
  const dispatch = useDispatch();
  const { blog, bannerLoading } = useSelector((state) => state.blog);

  function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    dispatch(uploadBanner(file));
  }

  return (
    <div className="flex w-full items-center justify-center mb-4">
      {bannerLoading ? (
        <div className="h-[360px] w-[640px] flex items-center justify-center bg-slate-100 dark:bg-slate-400 rounded-lg border-2 border-dashed border-gray-300">
          <Spinner size="lg" />
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className=" flex h-[360px] w-[640px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {blog?.banner ? (
            <img
              src={blog?.banner}
              alt="Uploaded Banner"
              className=" w-full object-cover rounded-lg h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload a banner</span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or JPEG
              </p>
            </div>
          )}
          <FileInput
            id="dropzone-file"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={bannerLoading}
          />
        </Label>
      )}
    </div>
  );
}

export default Banner;
