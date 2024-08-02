import { Textarea, TextInput } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { useSelector } from "react-redux";

function LeftSection({ errors, register }) {
  const { user } = useSelector((state) => state.setting);

  return (
    <section className="grid grid-rows-[auto_auto_auto_auto] gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px] flex-row">
          <MdOutlineMailOutline className="input-icon" />
          <TextInput
            name="email"
            type="email"
            defaultValue={user.email}
            placeholder="Please enter your email"
            className="w-full"
            id="email"
            color="gray"
            {...register("email", {
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
        </div>
        {errors?.email && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <FiAtSign className="input-icon" />
          <TextInput
            name="username"
            type="text"
            placeholder="Please enter your username"
            defaultValue={user.username}
            className="w-full"
            id="username"
            color="gray"
            {...register("username", {
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
        </div>
        {errors?.username?.message && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.username?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <FaRegUser className="input-icon" />
          <TextInput
            name="name"
            type="text"
            defaultValue={user.name}
            className="w-full"
            placeholder="Please enter your full name"
            id="email"
            color="gray"
            {...register("name", {
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
        </div>
        {errors?.name && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.name?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-3 min-w-[300px]">
          <TbFileDescription className="input-icon" />
          <Textarea
            name="bio"
            defaultValue={user.bio}
            className="h-28 resize-none w-full"
            placeholder="Please enter your bio"
            id="email"
            color="gray"
            {...register("bio", {
              required: {
                value: true,
                message: "Please enter your bio.",
              },
              maxLength: {
                value: 200,
                message: "Limit is 200 chars",
              },
            })}
          />
        </div>
        {errors?.bio && (
          <span className="ml-8 text-red-600 font-bold text-xs">
            {errors?.bio?.message}
          </span>
        )}
      </div>
    </section>
  );
}

export default LeftSection;
