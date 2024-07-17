import Input from "../components/Input";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineKey } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import { FiAtSign } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Alert, Button, Spinner } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  let pwd = watch("password");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function onSubmit(data) {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/signup`, data)
      .then(({ data }) => {
        console.log(data);
        setIsLoading(false);
        reset();
        navigate("/");
      })
      .catch(({ response }) => {
        console.error(response);
        setErrorMessage(response.data.message);
        setIsLoading(false);
        reset();
      });
  }

  return (
    <AnimationWrapper>
      <div className="h-cover flex flex-col items-center mt-20 justify-center mb-10">
        <h1 className="text-5xl capitalize text-center mb-16 font-medium tracking-wide">
          Join Us Today!
        </h1>
        <form
          className="flex w-[50%] flex-col gap-y-4 justify-center items-center"
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
          {errorMessage && (
            <Alert color="failure" className="p-1 px-3">
              <span className="text-xs">{errorMessage}</span>
            </Alert>
          )}
          <Button
            type="submit"
            className="center mt-5"
            color="dark"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>

          <div className="flex relative w-full items-center gap-2 my-2">
            <hr className="w-1/2 border-slate-300 mt-1" />
            <p className="text-center text-slate-300">or</p>
            <hr className="w-1/2 border-slate-300 mt-1" />
          </div>

          <Button className="center" color="light">
            <span className="pt-1 mr-3">Continue with google</span>
            <FcGoogle className="text-3xl" />
          </Button>

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
      </div>
    </AnimationWrapper>
  );
}

export default Signup;
