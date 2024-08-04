import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allNotifications } from "./dashSlice";
import Spinner from "../../components/Spinner";
import { Button, ButtonGroup } from "flowbite-react";
import { Link, useSearchParams } from "react-router-dom";
import NotificationCard from "./NotificationCard";

function DashNotifications() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { notifications, notisLoading } = useSelector((state) => state.dash);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(
    function () {
      const query = searchParams.toString();
      dispatch(allNotifications({ token, query }));
    },
    [token, dispatch, searchParams]
  );

  if (notisLoading) {
    return <Spinner />;
  }
  console.log(notifications);

  const handleFilterChange = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });
    setSearchParams(updatedParams);
  };

  return (
    <>
      <div className="flex justify-center items-center lg:flex-row flex-col gap-3">
        <ButtonGroup>
          <Button onClick={() => handleFilterChange({ type: null })}>
            All
          </Button>
          <Button onClick={() => handleFilterChange({ type: "comment" })}>
            Comments
          </Button>
          <Button onClick={() => handleFilterChange({ type: "like" })}>
            Likes
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button onClick={() => handleFilterChange({ seen: null })}>
            All
          </Button>
          <Button onClick={() => handleFilterChange({ seen: true })}>
            Read
          </Button>
          <Button onClick={() => handleFilterChange({ seen: false })}>
            Unread
          </Button>
        </ButtonGroup>
      </div>

      {notifications?.results === 0 ? (
        <div className="flex flex-col gap-10 justify-center items-center pt-20">
          <img
            src={`https://cdn-icons-png.flaticon.com/512/7466/7466140.png`}
            className="max-h-[300px] max-w-[300px]"
            alt="no data"
          />
          <Link
            to="/write"
            className="hover:underline hover:underline-offset-2 hover:text-blue-400"
          >
            Start writing your blogs
          </Link>
        </div>
      ) : (
        <div className="py-16">
          {notifications?.data?.map((curr, index) => (
            <NotificationCard notification={curr} key={index} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default DashNotifications;
