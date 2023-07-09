import React, { useEffect, useState } from "react";
// import PostDetails from './PostDetails'
import "./Blog.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function Update({ setTrigger ,postId}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blog_image, setBlog_image] = useState("");
  const [model, setModel] = useState(false);


  const navigation = useNavigate();
  

  const toggleModel = () => {
    setModel(!model);
  };


  const info = { title: title,
     content: content,
      blog_image: blog_image };
   
  const handleSubmit = async () => {
    setTrigger(true);
    try {
      await axios.put(`http://localhost:3000/blogs/${postId}`, info);
      navigation("/blog");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <button onClick={toggleModel} className="btn-model">
       update
      </button>

      { model &&(
        <div className="popUp-update-update">
        <div className="form-update-popup">
          <label htmlFor="title">
            Title:
          </label>
          <input
            className="Input"
            type="text"
            id="blog-title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      
        <div  className="form-update-popup">
          <label htmlFor="title">
            Content:
          </label>
          <input
            className="Input"
            type="text"
            id="update-content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-update-popup">
          <label htmlFor="image">
            set your image:
          </label>
          <input
            className="Input"
            type="text"
            id="blog-image"
            name="image"
            onChange={(e) => setBlog_image(e.target.value)}
          />
        </div>

        <button className="Bnt-update-popup" onClick={(e) => handleSubmit(e)}>
          update
        </button>

    </div>
      )}
      </>
  );
}

export default Update;
