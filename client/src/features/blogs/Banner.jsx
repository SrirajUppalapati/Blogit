import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { Alert, Button, FileInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "./blogSlice";
import { IoAlertCircleOutline } from "react-icons/io5";

function Banner() {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);
  const { theme } = useSelector((state) => state.theme);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(
    function () {
      if (file) {
        setImgUrl(URL.createObjectURL(file));
      }
    },
    [file, setImgUrl]
  );
  useEffect(
    function () {
      setError(null);
    },
    [dispatch]
  );
  function handleImageUpload() {
    if (!file) {
      setError("Please upload an image.");
      return;
    }
    setLoading(true);

    const fileName = Date.now() + file.name;
    const imageRef = ref(storage, `Banner/${fileName}`);
    uploadBytes(imageRef, file)
      .then((img) => {
        getDownloadURL(img.ref)
          .then((url) => {
            console.log(url);
            dispatch(writeBlog({ ...blog, banner: url }));
            setError(null);
            setImgUrl(url);
            setLoading(false);
          })
          .catch((err) => {
            setError("Please upload an image.");
            setLoading(false);
            console.error(err);
          });
      })
      .catch((err) => {
        setLoading(false);

        setError("Please upload an image.");
        console.error(err);
      });
  }

  function handleRemoveImage() {
    setImgUrl(null);
    dispatch(writeBlog({ ...blog, banner: "" }));
  }
  console.log(blog.banner);

  return (
    <div>
      <div className="flex justify-center items-center">
        <img
          src={blog.banner || imgUrl || "src/images/blog_banner.png"}
          alt="banner"
          className="mb-3 dark:border-slate-800 border-slate-200 border-2 rounded-lg max-w-full h-auto max-h-[450px]"
        />
      </div>

      <div className="flex gap-4 justify-between">
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />
        {error && (
          <div className="flex justify-center items-center">
            <Alert
              color="failure"
              className="p-1 px-3 w-fit"
              icon={IoAlertCircleOutline}
            >
              <span className="text-sm text-center">{error}</span>
            </Alert>
          </div>
        )}
        <div className="flex justify-around">
          {blog.banner && (
            <Button
              className="focus:ring-0 text-xs"
              color="light"
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          )}
          <Button
            onClick={handleImageUpload}
            disabled={loading}
            className="focus:ring-0"
            color={theme === "dark" ? "cyan" : "dark"}
          >
            {loading ? <Spinner /> : "Upload Image"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
