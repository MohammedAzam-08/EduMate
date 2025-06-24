import User from "../models/userModel.js";

// Update profile info
export const updateProfile = async (req, res) => {
  const { name, email, notifications } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, notifications },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match" });
  }

  try {
    const user = await User.findById(userId);
    const isMatch = await user.correctPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password", error: err.message });
  }
};
