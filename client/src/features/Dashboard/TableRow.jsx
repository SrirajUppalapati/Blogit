import { Button, Table } from "flowbite-react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getUserBlogs } from "./dashSlice";
import toast from "react-hot-toast";

function TableRow({ blog }) {
  const {
    title,
    banner,
    blogId,
    activity: { totalLikes, totalComments, totalReads },
  } = blog;

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteBlog({ blogId, token })).then((data) => {
      if (data.type.includes("fulfilled")) {
        toast.success("Successfully Deleted!");
        dispatch(getUserBlogs({ token }));
      }
    });
  }

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        <img
          src={banner}
          alt="blog banner"
          className="max-h-[100px] max-w-[100px]"
        />
      </Table.Cell>
      <Table.Cell className="text-sm text-gray-900 dark:text-white  overflow-scroll">
        <Link
          to={`/blog/${blogId}`}
          className="line-clamp-3 hover:underline capitalize leading-tight"
        >
          {title}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <p className="flex gap-2 text-sm italic">
          Likes: <span className="text-sm">{totalLikes}</span>
        </p>
        <p className="flex gap-2 text-sm italic">
          Comments: <span className="text-sm">{totalComments}</span>
        </p>
        <p className="flex gap-2 text-sm">
          Views: <span className="text-sm">{totalReads}</span>
        </p>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Link to={`/write/${blogId}`}>
            <Button color="gray">
              <MdOutlineModeEditOutline />
            </Button>
          </Link>
          <Button color="gray">
            <MdOutlineDeleteOutline
              className="hover:text-red-400"
              onClick={handleDelete}
            />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
}

export default TableRow;
