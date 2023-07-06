const isAuth = require("../middleware/isAuth");
const User = require("../model/user");
const UserProfile=require("../model/userProfile")


const UserProfileController = {

  getUserProfile: [
    isAuth('any'),
    async (req, res) => {
      const { id } = req.params;
      try {
        const userProfile = await UserProfile.findOne({
          where: { user_id: id },
        });

        if (userProfile) {
          res.json(userProfile);
        } else {
          res.status(404).json({ error: "User profile not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],
  
  
  
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