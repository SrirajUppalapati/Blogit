import { MdOutlineMailOutline } from "react-icons/md";
import Input from "../../components/Input";
import { FiAtSign } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { Alert, Button, Spinner } from "flowbite-react";
import Oauth from "./Oauth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "./authSlice";
import axios from "axios";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  let pwd = watch("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  function onSubmit(data) {
    dispatch(signinStart());
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/signup`, data)
      .then(({ data }) => {
        dispatch(signinSuccess({ user: data.data, token: data.access_token }));
        reset();
        navigate("/");
      })
      .catch(({ response }) => {
        console.error(response);
        dispatch(signinFailure(response.data.message));
        reset();
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
              message: "Please use an email format.",
            },
          })}
        />
        {errors?.email && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className=" w-[100%]">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          Icon={FiAtSign}
          register={register("username", {
            required: {
              value: true,
              message: "Please enter your username.",
            },
            pattern: {
              value: /^[a-z\d]+$/i,
              message: "Please enter alphabets and numbers.",
            },
          })}
        />
        {errors?.username?.message && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.username?.message}
          </span>
        )}
      </div>
      <div className=" w-[100%]">
        <Input
          name="name"
          type="text"
          placeholder="Full Name"
          Icon={FaRegUser}
          register={register("name", {
            required: {
              value: true,
              message: "Please enter your full name.",
            },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Please enter only alphabets!",
            },
          })}
        />
        {errors?.name && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.name?.message}
          </span>
        )}
      </div>
      <div className=" w-[100%]">
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
      <div className=" w-[100%]">
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

      <div className="flex relative w-full items-center gap-2 my-2">
        <hr className="w-1/2 border-slate-300 mt-1" />
        <p className="text-center text-slate-300">or</p>
        <hr className="w-1/2 border-slate-300 mt-1" />
      </div>

      <Oauth />

      <Link
        to="/signin"
        className="flex text-center justify-center items-center mt-4 gap-2 tracking-widest hover:font-bold text-sm md:text-md"
      >
        Already a member?{" "}
        <span className="underline text-sm md:text-md font-bold hover:font-extrabold">
          Sign In
        </span>
      </Link>
    </form>
  );
}

export default SignupForm;
