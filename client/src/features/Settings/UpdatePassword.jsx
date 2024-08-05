import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { HiOutlineKey } from "react-icons/hi2";
import { Button, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "./settingsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AnimationWrapper from "../../components/AnimationWrapper";

function UpdatePassword() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  let pwd = watch("newPassword");

  const { passwordLoading } = useSelector((state) => state.setting);
  const { theme } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(updateUserPassword({ data, token })).then((data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        navigate("/");
        toast.success("Successfully updated password!");
      }
    });
  }

  return (
    <AnimationWrapper>
      <div className="flex flex-col items-center justify-center md:pt-[10%] pt-[40%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-10"
        >
          <div className="w-[100%]">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              Icon={HiOutlineKey}
              register={register("currentPassword", {
                required: {
                  value: true,
                  message: "Please enter your current password.",
                },
                minLength: {
                  value: 8,
                  message: "Current Password must be 8 letters long.",
                },
              })}
            />
            {errors?.currentPassword && (
              <span className="ml-8 text-red-600 font-bold text-xs">
                {errors?.currentPassword?.message}
              </span>
            )}
          </div>

          <div className="w-[100%]">
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              Icon={HiOutlineKey}
              register={register("newPassword", {
                required: {
                  value: true,
                  message: "Please enter your password.",
                },
                minLength: {
                  value: 8,
                  message: "Password must be 8 letters long.",
                },
              })}
            />
            {errors?.newPassword && (
              <span className="ml-8 text-red-600 font-bold text-xs">
                {errors?.newPassword?.message}
              </span>
            )}
          </div>
          <div className="w-[100%]">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              Icon={HiOutlineKey}
              register={register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please enter your confirm password.",
                },
                minLength: {
                  value: 8,
                  message: "Confirm Password must be 8 letters long.",
                },
                validate: (value) => value === pwd || "Passwords should match.",
              })}
            />
            {errors?.confirmPassword && (
              <span className="ml-8 text-red-600 font-bold text-xs">
                {errors?.confirmPassword?.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="center"
            color={theme === "dark" ? "cyan" : "dark"}
            onClick={handleSubmit}
            disabled={passwordLoading}
          >
            {passwordLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </AnimationWrapper>
  );
}

export default UpdatePassword;
