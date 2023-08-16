import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { useParams } from "react-router-dom";

const ReadBlog = () => {
  const { id } = useParams();
  const [value, setValue] = useState({ title: "", content: "" });

  useEffect(() => {
    (async () => {
      const res = await axios.get(baseUrl + "/blog/" + id);
      setValue(res.data[0]);
    })();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 center-screen">
          <div className="card w-100 p-4 rounded border-1">
            <div className="card-body bg-[white]">
              <h3 className="text-bold">{value.title}</h3>
              <h5>{value.content}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
