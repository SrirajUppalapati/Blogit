import { FileInput, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePicture } from "./settingsSlice";
import Spinner from "../../components/Spinner";

function ProfilePhoto() {
  const dispatch = useDispatch();
  const { user, pictureLoading } = useSelector((state) => state.setting);

  function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    dispatch(uploadProfilePicture(file));
  }

  return (
    <div className="flex justify-center items-center">
      {pictureLoading ? (
        <div className="h-[100px] w-[100px] flex items-center justify-center bg-slate-100 dark:bg-slate-400 rounded-full border-2 border-dashed border-gray-300">
          <Spinner />
        </div>
      ) : (
        <Label
          htmlFor="dropzone-file"
          className=" flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {user?.profilePicture && (
            <img
              src={user?.profilePicture}
              alt="Uploaded Profile"
              className=" w-full object-cover rounded-full h-full"
            />
          )}
          <FileInput
            id="dropzone-file"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={pictureLoading}
          />
        </Label>
      )}
    </div>
  );
}

export default ProfilePhoto;
