const cloudinary = require('../db/cloudinary');
const Blog = require('../model/blog');

module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.findAll();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBlogById: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findByPk(id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;

    try {
      await Blog.destroy({ where: { id } });
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createBlog: async (req, res) => {
    const { title, content, blog_image } = req.body;

    try {
      const result = await cloudinary.uploader.upload(blog_image, {
        folder: 'blog_images',
      });
      

      const blog = await Blog.create({
        title,
        content,
        blog_image: result.secure_url,
        
      });
      console.log("onsole.log(result)",result)
      res.json(blog);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateBlog: async (req, res) => {
    const { id } = req.params;
    const { title, content, blog_image } = req.body;

    try {
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (blog_image !== blog.blog_image) {
        const result = await cloudinary.uploader.upload(blog_image, {
          folder: 'blog_images',
        });
        blog.blog_image = result.secure_url;
      }

      blog.title = title;
      blog.content = content;

      await blog.save();

      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
