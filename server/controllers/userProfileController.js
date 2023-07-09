const isAuth = require("../middleware/isAuth");
const User = require("../model/user");
const UserProfile = require("../model/userProfile");
const cloudinary = require("../db/cloudinary");

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

  updateUserProfile: [
    isAuth('any'),
    async (req, res) => {
      const { id } = req.params;
      const newdata = req.body;

      try {
        const userProfile = await UserProfile.findOne({
          where: { user_id: id },
        });

        if (!userProfile) {
          return res.status(404).json({ error: 'User profile not found' });
        }

        // Check  image file 
        if (req.files && req.files.image) {
          const imageFile = req.files.image;

          // Upload  image  to Cloudinary
          const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            folder: 'image_profile',
          });

          newdata.image_url = result.secure_url; 
        }

        // Update the userProfile
        await userProfile.update(newdata);

        res.json(userProfile);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  ],
};

module.exports = UserProfileController;
