import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { handleError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name_of_user, mobile, password, type_of_id, no_of_id } = req.body;
  if (
    !name_of_user ||
    !mobile ||
    !password ||
    name_of_user === "" ||
    password === ""
  ) {
    next(handleError(400, "All fields are required!"));
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const username = name_of_user + "-" + no_of_id.toString();
    await User.create({
      name_of_user,
      username,
      mobile,
      password: hashedPassword,
      type_of_id,
      no_of_id,
    });
    res.status(200).json({ message: "Sign up successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return next(handleError(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(handleError(400, "Invalid password!"));
    const token = jwt.sign(
      { id: validUser._id, is_emplyee: validUser.is_employee },
      process.env.JWT_SECRET
    );
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 12 * 3600000); // 12 hour
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   try {
//     const { username, email, photoProfile } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const token = jwt.sign(
//         { id: user._id, isAdmin: validUser.isAdmin },
//         process.env.JWT_SECRET
//       );
//       const { password: hashedPassword, ...rest } = user._doc;
//       const expiryDate = new Date(Date.now() + 3600000);
//       console.log("here if");
//       res
//         .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
//         .status(200)
//         .json(rest);
//     } else {
//       var randomString =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(randomString, 10);
//       const newUser = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//         photoProfile,
//       });
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: hashedPassword2, ...rest } = newUser._doc;
//       const expiryDate = new Date(Date.now() + 3600000);
//       console.log("here else");
//       res
//         .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout successfully!");
};
