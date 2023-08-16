import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { Link } from "react-router-dom";
import "../assets/css/CreateBlog.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const BlogList = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await axios.get(baseUrl + "/blogs");
      setData(res.data);
    })();
  }, [id]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(baseUrl + "/delete-blog/" + id);
        setId(id);
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
        } else {
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
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {data.length === 0 && (
          <div className="fs-2 fw-bold center-screen">Blog Not Found</div>
        )}
        {data &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="col-xl-4 col-lg-6 col-md-8 col-12 h-50 mt-5"
              >
                <div className="card w-100 p-4 rounded border-0">
                  <div className="card-body bg-[white]">
                    <h3 className="card-title">{item.title}</h3>
                    <h5 className="mt-3 card-text">{item.content}</h5>
                    <Link to={"/blog/" + item._id}>
                      <button className="btn border-1 border-black w-20 h-10">
                        Read More...
                      </button>
                    </Link>
                    <div className="mt-3">
                      <Link to={"/update-blog/" + item._id}>
                        <button className="btn btn-primary edit-btn">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
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
  );
};

export default BlogList;
