import React, { useState } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Blog.css'
function Post({ setTrigger }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blog_image, setBlog_image] = useState("");
  const [model, setModel] = useState(false);

  const navigation = useNavigate();

  const handleSubmit = () => {
    setTrigger(true);
    axios
      .post("http://localhost:3000/blogs", {
        title: title,
        content: content,
        blog_image: blog_image,
      })
      .then((res) => {
        console.log(res);
        navigation("/blog");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModel = () => {
    setModel(!model);
  };

  return (
    <>
      <button onClick={toggleModel} className="btn-blog-post">
        Post
      </button>

      {model && (
        <div className="main">
          <div className="post-container">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                className="Input"
                type="text"
                id="blog-title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Content:</label>
              <input
                className="Input"
                type="text"
                id="blog-content"
                name="content"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Set your image:</label>
              <input
                className="Input"
                type="text"
                id="blog-image"
                name="image"
                onChange={(e) => setBlog_image(e.target.value)}
              />
            </div>
            <button
              className="btn-blog-post"
              type="submit"
              onClick={() => {
                handleSubmit();
                toggleModel();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
