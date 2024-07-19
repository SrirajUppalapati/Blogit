import { TextInput } from "flowbite-react";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Input({ name, type, id, value, placeholder, Icon, register }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const Password = passwordVisible ? IoEyeOutline : IoEyeOffOutline;
  return (
    <div className="relative flex justify-center items-center md:w-[400px]">
      <div className="w-[100%] flex items-center gap-x-3">
        <Icon className="input-icon" />
        <TextInput
          name={name}
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          defaultValue={value}
          placeholder={placeholder}
          id={id}
          className="w-full"
          color="gray"
          {...register}
        />
      </div>
      {type === "password" && (
        <Password
          className="absolute right-2 hover:cursor-pointer ml-2 text-lg"
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      )}
    </div>
  );
}

export default Input;
