const User = require("../model/user");

const UserProfileController = {
    getUserProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.json(user);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUserProfile:async (req,res)=>{
    const { id } = req.params;
    const newdata = req.body;
    try{
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        await user.update(newdata);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }
};
module.exports = UserProfileController;