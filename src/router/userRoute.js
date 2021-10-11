const express = require("express");
const User = require("../models/user");
const mail = require("../utils/mail");
const crypt = require("../utils/crypt");

const router = express.Router();

// route for user to subscribe to our email newsletter service
router.post("/api/v1/user/subscribe", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    mail.verificationMail(user.email, crypt.encrypt(user.email));
  } catch (err) {
    // error code if email is duplicated

    if (err.code === 11000) {
      return res.status(406).json({
        status: "failure",
        message: "User already exists",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  res.json({
    status: "success",
    message: "A verification mail is sent to your email. Please verify.",
  });
});

// route called when user presses the button 'click to verify' sent in verification email
router.get("/api/v1/verify/:id", async function (req, res) {
  const verifiedEmail = crypt.decrypt(req.params.id);
  const filter = { email: verifiedEmail };
  const update = { isVerified: true };
  const user = await User.findOneAndUpdate(filter, update);

  res.json({
    status: "successs",
    message: "User verified successfully",
  });
});

module.exports = router;
