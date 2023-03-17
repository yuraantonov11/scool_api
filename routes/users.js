const express = require("express");
const passport = require("passport");
const User = require("../models/User.model");

const router = express.Router();


// Update an existing user
router.put(
    "/:id",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const userId = req.params.id;

      try {
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check if current user has permissions to update the user
        if (
            req.user.id !== userId &&
            req.user.role !== "admin" &&
            req.user.role !== "superadmin"
        ) {
          return res.status(401).json({
            message: "You do not have permission to update this user",
          });
        }

        // Update the user
        await User.update(req.body, { where: { id: userId } });

        return res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
);

module.exports = router;
