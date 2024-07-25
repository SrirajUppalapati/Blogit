import { Spinner as MySpinner } from "flowbite-react";
import { useSelector } from "react-redux";

function Spinner() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="min-h-screen pt-[25%] pl-[50%]">
      <MySpinner
        size="xl"
        className="text-center"
        color={theme === "light" ? "gray" : "info"}
      />
    </div>
  );
}

export default Spinner;
