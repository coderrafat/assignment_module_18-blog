import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UpdateBlog from "./pages/UpdateBlog";
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";

export const baseUrl = "https://blog-coderrafat.onrender.com/api/v1";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
