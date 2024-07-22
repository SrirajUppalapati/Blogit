import { MdOutlineMailOutline } from "react-icons/md";
import Input from "../../components/Input";
import { HiOutlineKey } from "react-icons/hi2";
import { Button, Spinner } from "flowbite-react";
import Oauth from "./Oauth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "./authSlice";
import toast from "react-hot-toast";

function SigninForm() {
  const { theme } = useSelector((state) => state.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  function onSubmit(data) {
    dispatch(signInUser(data)).then((data) => {
      if (data.payload) {
        toast.success("SignIn successful!");
      } else {
        toast.error("Please check your email and password!");
      }
    });
  }
  return (
    <form
      className="flex flex-col gap-y-4 justify-center items-center pb-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" w-[100%]">
        <Input
          name="email"
          type="name"
          placeholder="Email Address"
          Icon={MdOutlineMailOutline}
          register={register("email", {
            required: {
              value: true,
              message: "Please enter your email.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please use a email format with @something.something",
            },
          })}
        />
        {errors?.email && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="mb-3 w-[100%]">
        <Input
          name="password"
          type="password"
          placeholder="Password"
          Icon={HiOutlineKey}
          register={register("password", {
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
        {errors?.password && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="center mt-5"
        color={theme === "dark" ? "cyan" : "dark"}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Submit"}
      </Button>

      <div className="flex relative w-full items-center gap-2 my-10">
        <hr className="w-1/2 border-slate-300 mt-1" />
        <p className="text-center text-slate-300">or</p>
        <hr className="w-1/2 border-slate-300 mt-1" />
      </div>
      <Oauth />
      <Link
        to="/signup"
        className="flex text-center justify-center items-center mt-4 gap-2 tracking-widest hover:font-bold text-sm md:text-md"
      >
        Want to join us?{" "}
        <span className="underline text-sm md:text-md font-bold hover:font-extrabold">
          Sign Up
        </span>
      </Link>
    </form>
  );
}

export default SigninForm;
