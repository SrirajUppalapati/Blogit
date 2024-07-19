import { MdOutlineMailOutline } from "react-icons/md";
import Input from "../../components/Input";
import { HiOutlineKey } from "react-icons/hi2";
import { Alert, Button, Spinner } from "flowbite-react";
import Oauth from "./Oauth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "./authSlice";
import axios from "axios";

function SigninForm() {
  const { theme } = useSelector((state) => state.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  function onSubmit(data) {
    dispatch(signinStart());
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/login`, data)
      .then(({ data }) => {
        console.log("Succesful signin");
        dispatch(signinSuccess(data.data));
        reset();
        navigate("/");
      })
      .catch((response) => {
        console.error(response);
        dispatch(signinFailure("Please check your email and password."));

        reset();
      });
  }
  return (
    <div className="h-screen">
      <form
        className="flex flex-col gap-y-4 justify-center items-center"
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

        {error && (
          <Alert color="failure" className="p-1 px-3">
            <span className="text-xs">{error}</span>
          </Alert>
        )}
        <Button
          type="submit"
          className="center mt-5"
          color={theme === "dark" ? "cyan" : "dark"}
          onClick={handleSubmit}
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
    </div>
  );
}

export default SigninForm;
