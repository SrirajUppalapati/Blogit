import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allNotifications } from "./dashSlice";
import Spinner from "../../components/Spinner";
import { Button, Dropdown } from "flowbite-react";
import { Link, useSearchParams } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import { BsFilterRight } from "react-icons/bs";

function DashNotifications() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { notifications, notisLoading } = useSelector((state) => state.dash);
  const [searchParams, setSearchParams] = useSearchParams();

  const [type, setType] = useState("all");
  const [seen, setSeen] = useState("all");

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

  function handleClick() {
    handleFilterChange({ type, seen });
  }

  return (
    <>
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="pr-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<BsFilterRight className="text-3xl" />}
            dismissOnClick={false}
          >
            <div className="p-4 flex flex-col gap-3">
              <p>Type</p>
              <div className="flex flex-row gap-2">
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    onChange={() => setType(null)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>All</span>
                </label>
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="comment"
                    onChange={(e) => setType(e.target.value)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>Comments</span>
                </label>
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="like"
                    onChange={(e) => setType(e.target.value)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>Likes</span>
                </label>
              </div>
              <p>Seen</p>
              <div className="flex flex-row gap-2">
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="seen"
                    value="all"
                    onChange={() => setSeen(null)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>All</span>
                </label>
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="seen"
                    value={true}
                    onChange={(e) => setSeen(e.target.value)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>Read</span>
                </label>
                <label className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer">
                  <input
                    type="radio"
                    name="seen"
                    value={false}
                    onChange={(e) => setSeen(e.target.value)}
                    className="focus:ring-0 focus:border-0"
                  />
                  <span>Unread</span>
                </label>
              </div>
              <Button color="dark" onClick={handleClick}>
                Filter
              </Button>
            </div>
          </Dropdown>
        </div>
        <div>
          <p className="text-sm flex w-fit justify-center items-center italic gap-1 p-2 bg-slate-100 dark:bg-slate-800  rounded-lg">
            Total Number of Notifications:
            <span className="not-italic font-bold">
              {notifications?.results}
            </span>
          </p>
        </div>
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
        <div className="pb-16">
          {notifications?.data?.map((curr, index) => (
            <NotificationCard notification={curr} key={index} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default DashNotifications;
