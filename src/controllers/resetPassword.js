import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwtHelper from "../utilities/jwt";
import User from "../services/user";
import sendGrid from "../utilities/sendGrid";

dotenv.config();
const { verifyUserToken } = jwtHelper;

// const jwt = require("jsonwebtoken");

/**
 * @class
 * @description recover and reset
 * @exports
 */
export default class {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async recover(req, res) {
    try {
      const { email } = req.body;
      const user = await User.emailExist(email);
      if (!user) {
        return res.status(404).json({ status: 404, error: "The email address is not associated with any account.", });
      }
      if (!user.verified) {
        return res.status(403).json({ status: 403, error: "The account is not verified. Please check your email inbox for verification email.", });
      }
      // const signed = await generateToken({ user });
      await sendGrid.sendResetPasswordEmail(email, user.id, res);
      return res.status(200).json({ status: 200, message: "A reset email has been sent" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error", });
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset response object
   * @returns {object} Success message
   */
  static async reset(req, res) {
    try {
      const { id } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const { newPassword } = req.body;
      const user = await User.userExist(id);
      const verifyUser = verifyUserToken(token, user.password);
      if (!verifyUser) return res.status(410).json({ status: 410, error: "link has expired or has been used. please request for a  new link." });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newUserPassword = { password: hashedPassword };
      const a = await User.updateUserPassword(id, newUserPassword);
      return res.status(200).json({ status: 200, message: "User paswword updated successfully", data: a[1] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error1" });
    }
  }
}
