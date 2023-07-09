import React, { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import axios from "axios";
import Update from "./Update";
import Post from "./Post";
import './Blog.css'

const Blog = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [image, setImage] = useState("");

  const setFileTobse = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImage = (e) => {
    const file = e.target.file[0];
    setFileTobse(file);
    console.log(file);
  };

  useEffect(() => {
    fetch();
    setTrigger(false);
  }, [trigger]);

  const fetch = () => {
    axios
      .get("http://localhost:3000/blogs")
      .then((res) => {
        setData(res.data);
        console.log("res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="blog-container">
     <div className="blog-container-post">
     <Post setTrigger={setTrigger} />
     </div>
      <div className="blog">
      <PostDetails data={data} setTrigger={setTrigger} />
      </div>
    </div>
  );
};

export default Blog;
