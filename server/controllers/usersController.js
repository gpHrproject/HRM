const User = require("../model/user");
const isAuth = require("../middleware/isAuth");
//Crud user only hr have the auth to the crud
const UserController = {
  getAllUsers: [
    isAuth("hr"),
    async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],

  getUserById: [
    isAuth("hr"),
    async (req, res) => {
      const { id } = req.params;

      try {
        const user = await User.findByPk(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],

  createUser: [
    isAuth("hr"),
    async (req, res) => {
      const { name, email, password } = req.body;

      try {
        const user = await User.create({ name, email, password });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],
  //user can update his profile
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      await User.update({ name, email }, { where: { id } });
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: [
    isAuth("hr"),
    async (req, res) => {
      const { id } = req.params;

      try {
        await User.destroy({ where: { id } });
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],

  // logIn / Register
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if the username is already registered
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ error: "Username already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new HR user
      const newUser = await User.create({
        username,
        password: hashedPassword,
        role: "hr",
      });

      // Return the newly created user in the response
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find user
      const user = await User.findOne({ where: { username } });

      // Check if  user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
