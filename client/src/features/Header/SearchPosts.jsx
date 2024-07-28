import { useSelector } from "react-redux";
import TrendingBlogCard from "../Home/TrendingBlogCard";
import { useParams } from "react-router-dom";
import DatNotFound from "../../api/DatNotFound";

function SearchPosts() {
  const { postsResult } = useSelector((state) => state.search);

  const { query } = useParams();

  if (postsResult.results === 0) {
    const type = "post";
    return DatNotFound({ query, type });
  }

  return (
    postsResult?.data && (
      <div className="">
        {postsResult.data.map((curr, index) => (
          <div key={index}>
            <TrendingBlogCard blog={curr} id={index + 1} />
          </div>
        ))}
      </div>
    )
  );
}

export default SearchPosts;
