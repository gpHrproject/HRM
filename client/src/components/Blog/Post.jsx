import React, { useState } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Post({ setTrigger }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blog_image, setBlog_image] = useState("");

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
        window.alert("item added successfully");
        navigation("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="FormGroup">
        <label className="Label" htmlFor="title">
          Title:
        </label>
        <input
          className="Input"
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="FormGroup">
        <label className="Label" htmlFor="title">
          Content:
        </label>
        <input
          className="Input"
          type="text"
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="FormGroup">
        <label className="Label" htmlFor="image">
          set your image:
        </label>
        <input
          className="Input"
          type="text"
          id="image"
          name="image"
          onChange={(e) => setBlog_image(e.target.value)}
        />
      </div>

      <button className="Button" type="submit" onClick={() => handleSubmit()}>
        POST YOUR BLOG
      </button>
    </div>
  );
}

export default Post;
