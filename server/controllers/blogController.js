// const cloudinary= require('../db/cloudinary')
const Blog = require("../model/blog");
const cloudinary = require('cloudinary').v2
// const isAuth = require("../middleware/isAuth");
cloudinary.config({
  cloud_name:"dhz4wb76m",
  api_key:"188578494939722",
  api_secret:"KO56N-J9FJUPOnfL0ru6jUapLSI"
})

module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.findAll();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getBlogById: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findByPk(id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ error: "blog not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;

    try {
      await Blog.destroy({ where: { id } });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createBlog: async (req, res) => {
    const { title, content, blog_image } = req.body;
    try {
      const uploadResult = await cloudinary.uploader.upload(blog_image, {
        folder: "blogs",
      });
      const blog = await Blog.create({
        title,
        content,
        blog_image: uploadResult.secure_url,
      });
      res.json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  updateBlog: async (req, res) => {
    const { id } = req.params;
    const { title, content, blog_image } = req.body;

    try {
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: "User not found" });
      }

      blog.title = title;
      blog.content = content;
      blog.blog_image = blog_image;

      res.json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
