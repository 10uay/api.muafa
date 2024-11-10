import User from "../models/user.model.js";
import { sms_Sender } from "../utils/sms_Sender.js";
import bcryptjs from "bcryptjs";

export const request_password_reset = async (req, res) => {
  const { mobile } = req.body;
  const user = await User.findOne({ mobile });

  if (!user) {
    return res.status(400).send("user-not-found");
  } // Generate a verification code
  const newVerificationCode = randomstring.generate({
    length: 7,
    charset: "numeric",
  });

  // Set the expiry date to 15 minutes from now
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 15);
  user.verification_code.expiry = expiryTime;
  user.verification_code.code = newVerificationCode;

  // Send SMS via local telecom API
  sms_Sender(mobile, `Your password reset code is: ${newVerificationCode}`);
};

export const reset_password = async (req, res) => {
  const { mobile, code, newPassword } = req.body;
  const user = await User.findOne({ mobile });

  if(!user) return res.status(400).send("invalid-phone-number");

  if (user.verification_code.code !== code) {
    return res.status(400).send("invalid-code");
  }

  // Check if the verification code has expired
  const currentTime = new Date();

  if (currentTime > user.verification_code.expiry) {
    return res.status(400).send("verification-code-has-expired");
  }

  // Update user's password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = bcryptjs.hashSync(newPassword, salt);
  user.password = hashedPassword;
  user.verification_code.code = ""; // Clear the verification code
  user.verification_code.expiry = null; // Clear the expiry date
  res.status(200).send("password-has-been-reset");
};

