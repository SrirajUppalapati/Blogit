import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { setUser } from "./settingsSlice";
import { useForm } from "react-hook-form";
import ProfilePhoto from "./ProfilePhoto";
import { Button } from "flowbite-react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { profileLoading, user } = useSelector((state) => state.setting);
  const { currentUser } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(setUser(currentUser));
    },
    [dispatch, currentUser]
  );

  function onSubmit(data) {
    console.log(data);
  }

  if (profileLoading || !Object.keys(user).length) {
    return <Spinner />;
  }

  return (
    <div className="pt-20 flex md:flex-row flex-col gap-10 justify-center items-center ">
      <div className="flex md:flex-col gap-2 pl-10">
        <p className="md:text-6xl text-3xl text-center dark:text-slate-600 text-slate-300 italic">
          Your <br className="hidden md:inline-block" />
          Profile
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-10 md:border-l pl-10 dark:border-slate-800 border-slate-100">
        <ProfilePhoto />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center pb-20"
        >
          <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
            <LeftSection errors={errors} register={register} />
            <RightSection errors={errors} register={register} />
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              className="center mt-5"
              color={theme === "dark" ? "cyan" : "dark"}
              onClick={handleSubmit}
              disabled={profileLoading}
            >
              {profileLoading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
