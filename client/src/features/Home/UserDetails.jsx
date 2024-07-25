import { useNavigate } from "react-router-dom";

function UserDetails({ author }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/profile/${author.username}`);
  }
  return (
    <button
      className="flex flex-row gap-1 justify-center items-center w-fit hover:underline underline-offset-4"
      onClick={handleSubmit}
    >
      <img
        src={author?.profilePicture}
        alt="profile"
        className="max-w-7 max-h-7 rounded-full border-2 dark:border-slate-700"
      />
      <span className="capitalize text-xs">{author?.name}</span>
    </button>
  );
}

export default UserDetails;
