import React, { useEffect, useState } from "react";
// import PostDetails from "./PostDetails";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState([]);
  // const [trigger, setTrigger] = useState(false);
  // const [image, setImage] = useState("");


  // const setFileTobse = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result);
  //   };
  // };
  
  // console.log(data);


  // const handleImage = (e) => {
  //   const file = e.target.file[0];
  //   setFileTobse(file);
  //   console.log(file);
  // };



  useEffect(() => {
    fetch();
    // setTrigger(false);
  }, []);


  const fetch = () => {
    axios
      .get("http://localhost:3000/blogs")
      .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => console.log(err));
  };

  // return <div>
  //   <PostDetails data={data} handleImage={handleImage} setTrigger={setTrigger}/>
  // </div>;
};

export default Blog;
