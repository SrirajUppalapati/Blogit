import { useSelector } from "react-redux";
import UserDetails from "../Home/UserDetails";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../../components/AnimationWrapper";

function SearchUsers() {
  const { usersResult } = useSelector((state) => state.search);
  const { query } = useParams();

  return (
    <AnimationWrapper>
      <div className="flex flex-col gap-6 pl-10">
        <div className="flex justify-start items-center gap-2">
          <p className="font-light text-lg italic  capitalize flex flex-row justify-center items-center gap-3">
            Users with <span className="text-xl font-extrabold">'{query}'</span>
            in their name
          </p>
        </div>

        {usersResult.data?.map((curr, index) => (
          <AnimationWrapper key={index}>
            <UserDetails author={curr} />
          </AnimationWrapper>
        ))}
      </div>
    </AnimationWrapper>
  );
}

export default SearchUsers;
