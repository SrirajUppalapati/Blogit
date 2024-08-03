import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { setUser, updateUserProfile } from "./settingsSlice";
import { useForm } from "react-hook-form";
import ProfilePhoto from "./ProfilePhoto";
import { Button } from "flowbite-react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import toast from "react-hot-toast";
import { editCurrentUser } from "../users/authSlice";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { profileLoading, user } = useSelector((state) => state.setting);
  const { currentUser, token } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      dispatch(setUser(currentUser));
    },
    [dispatch, currentUser]
  );

  function onSubmit(data) {
    const updatedUser = { ...user, ...data };

    dispatch(setUser(updatedUser));

    dispatch(updateUserProfile({ data: updatedUser, token })).then((result) => {
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Profile successfully updated!");
        navigate("/");
      }
    });
    dispatch(editCurrentUser(updatedUser));
  }

  if (profileLoading || !Object.keys(user).length) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="flex flex-col items-center justify-center gap-y-10 dark:border-slate-800 border-slate-100">
        <ProfilePhoto />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center pb-20"
        >
          <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
            <LeftSection errors={errors} register={register} />
            <RightSection errors={errors} register={register} />
          </div>
          <Button
            type="submit"
            className="center mt-20"
            color={theme === "dark" ? "cyan" : "dark"}
            onClick={handleSubmit}
            disabled={profileLoading}
          >
            {profileLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
