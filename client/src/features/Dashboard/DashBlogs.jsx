import { Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlogs } from "./dashSlice";
import Spinner from "../../components/Spinner";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

function DashBlogs() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { blogsData, blogsLoading } = useSelector((state) => state.dash);
  useEffect(
    function () {
      dispatch(getUserBlogs({ token }));
    },
    [token, dispatch]
  );

  if (blogsLoading) {
    return <Spinner />;
  }

  if (blogsData?.data?.blogs?.length === 0) {
    return (
      <div className="flex flex-col mx-10 pt-[10%] lg:pl-[20%] gap-10 justify-center items-center">
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
    );
  }
  return (
    <div className="flex flex-col mx-10 pt-10  lg:pl-[20%] gap-5">
      <div className="grid grid-cols-2 gap-4">
        <p>
          Blogs: <span>{blogsData?.data?.blogs?.length}</span>
        </p>
        <p>
          Likes: <span>{blogsData?.likes}</span>
        </p>
        <p>
          Comments: <span>{blogsData?.comments}</span>
        </p>
        <p>
          Views: <span>{blogsData?.reads}</span>
        </p>
      </div>
      {blogsData?.data?.blogs?.length && (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Banner</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Activity</Table.HeadCell>
              <Table.HeadCell />
            </Table.Head>
            <Table.Body className="divide-y">
              {blogsData?.data?.blogs?.map((curr, index) => (
                <TableRow blog={curr} key={index} />
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

export default DashBlogs;
