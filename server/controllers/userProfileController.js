const isAuth = require("../middleware/isAuth");
const User = require("../model/user");
const UserProfile = require("../model/userProfile");
const cloudinary = require("../db/cloudinary");

const UserProfileController = {
  getUserProfile: [
    isAuth("any"),
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
    isAuth("any"),
    async (req, res) => {
      const { id } = req.params;
      const {
        full_name,
        email,
        phone_number,
        address,
        image_profile,
        depertement,
      } = req.body;

      try {
        let updatedData = {
          full_name,
          email,
          phone_number,
          address,
          depertement,
        };
        const userProfile = await UserProfile.findOne({
          where: { user_id: id },
        });

        if (!userProfile) {
          return res.status(404).json({ error: "User profile not found" });
        }

        // Upload image to Cloudinary
        if (image_profile) {
          const result = await cloudinary.uploader.upload(image_profile, {
            folder: "image_profile",
          });
          updatedData.image_profile = result.secure_url;
        }

        // Update the userProfile
        await userProfile.update(updatedData);

        res.json(userProfile);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],
};

module.exports = UserProfileController;
