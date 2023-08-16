import { Link } from "react-router-dom";
import ReadBlog from "../components/ReadBlog";

const Blog = () => {
  return (
    <div className="container">
      <Link to={"/"}>
        <button className="btn btn-primary mt-3">All Blog</button>
      </Link>
      <ReadBlog />
    </div>
  );
};

export default Blog;
