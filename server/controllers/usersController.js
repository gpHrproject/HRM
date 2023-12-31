const User = require("../model/user");
const UserProfile = require("../model/userProfile");
const isAuth = require("../middleware/isAuth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

   createUser : [
    isAuth('hr'),
    async (req, res) => {
      const { username, email, password } = req.body;
  
      try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(409).json({ error: 'Email already registered' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
          role: 'user',
        });
        
      
  
        const userProfile = await UserProfile.create({
          full_name: '', 
          email: newUser.email,
          phone_number:'',
          address:'',
          image_profile:'',
          departement:''
        });
  
        await newUser.setUserProfile(userProfile); // create in the same time
  
        res.json(userProfile);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  ],
  
  //user can update his profile
  updateUser: [
    isAuth('any'),
    async (req, res) => {
      const { id } = req.params;
      const { username, email, department, phoneNumber, address } = req.body;
      const userIdFromToken = req.user.id; //  auth user ID  in req.user
  
      try {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Check auth user is the owner of the profile
        if (userIdFromToken !== user.id) {
          return res.status(403).json({ error: 'You are not authorized to update this profile' });
        }
  
        // Update 
        user.username = username;
        user.email = email;
        user.department = department;
        user.phoneNumber = phoneNumber;
        user.address = address;
  
        // Save
        await user.save();
  
        res.json(user);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  ],
  


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
    const { email, password } = req.body;
    console.log("body", req.body)

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new HR user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: "hr",
      })

      // Return the newly created user in the response
      res.json(newUser);
    } catch (error) {
      res.status(500).json(console.log("error",error));
    }
  },

  login: async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token : contains : user_id and role
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token as a bearer token in the response headers
    res.header('Authorization', `Bearer ${token}`).json(token);
    console.log(jwt.verify(token, 'your-secret-key').userId)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
};

module.exports = UserController;
