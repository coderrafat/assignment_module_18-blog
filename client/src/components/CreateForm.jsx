import { useEffect, useState } from "react";
import "../assets/css/CreateBlog.css";
import axios from "axios";
import { baseUrl } from "../App";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CreateForm = () => {
  const [FormValue, setFormValue] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(baseUrl + "/blog/" + id);
      setFormValue(res.data[0]);
    })();
  }, []);

  const handleButton = async (e) => {
    e.preventDefault(e);

    let url = baseUrl + "/create-blog";

    if (id) {
      url = baseUrl + "/update-blog/" + id;
    }

    const res = await axios.post(url, FormValue);

    if (res.data?.error) {
      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (res.status === 200 || res.status === 201) {
      toast.success(res.data.massage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => navigate("/"), 3000);
    }
  };

  const inputChange = (property, value) => {
    setFormValue({ ...FormValue, [property]: value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-8 col-12 center-screen">
          <div className="card w-100 p-4 rounded border-0">
            <div className="card-body bg-[white]">
              <h4 className="text-center">Write Your Blog</h4>
              <br />
              <label className="form-label">Title</label>
              <input
                value={FormValue.title}
                onChange={(e) => inputChange("title", e.target.value)}
                className="form-control animated"
                type="text"
                placeholder="Enter your title..."
              />
              <label className="form-label mt-3">Content</label>
              <textarea
                rows="4"
                value={FormValue.content}
                onChange={(e) => inputChange("content", e.target.value)}
                className="form-control"
                type="text"
                placeholder="Enter your content..."
              />
              <button
                onClick={handleButton}
                className="btn btn-primary w-50 mx-auto animated rounded-xl mt-3"
              >
                Save
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
