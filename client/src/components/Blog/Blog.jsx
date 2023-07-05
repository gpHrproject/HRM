import React, { useEffect, useState } from "react";
import App from "../../App";
import PostDetails from "./PostDetails";


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

  const handleimage = (e) => {
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
      })
      .catch((err) => console.log(err));
  };

  return <div>
    <PostDetails data={data} setTrigger={setTrigger}/>
  </div>;
};

export default Blog;
