const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private/Admin (You can add 'protect, admin' middleware if needed)
router.post("/", upload.single("image"), (req, res) => {
  // Check if file exists
  if (!req.file) {
    res.status(400);
    throw new Error("No image file uploaded");
  }

  // Return the path to the file so it can be saved in the DB
  // We replace backslashes with forward slashes for cross-platform URL compatibility
  res.status(200).send(`/${req.file.path.replace(/\\/g, "/")}`);
});

module.exports = router;
