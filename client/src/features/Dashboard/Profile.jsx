import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Profile</h1>
      <form>
        <div className="w-36 h-36">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="rounded-full w-full h-full"
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
