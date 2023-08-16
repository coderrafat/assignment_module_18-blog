import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="container">
      <div>
        <Link to={"/create-blog"}>
          <button className="btn btn-primary animated mt-3">Create Blog</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
