import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  registerValidation, loginValidation, profileValidate
} from "../validation/userValidation";
import User from "../services/user";
import jwtHelper from "../utilities/jwt";
import sendGrid from "../utilities/sendGrid";

dotenv.config();
const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, verify and log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async registerUser(req, res) {
    try {
      const { error } = registerValidation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const { email, username, password } = req.body;
      const Email = email.toLowerCase();
      const Username = username.toLowerCase();
      const emailExist = await User.emailExist(Email);
      if (emailExist) return res.status(409).json({ status: 409, error: "Email already used by another user." });
      const usernameExist = await User.usernameExist(Username);
      if (usernameExist) return res.status(409).json({ status: 409, error: `Sorry, ${username} is not available. Please pick another username` });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email: Email, username: Username, password: hashedPassword };
      const createdUser = await User.createUser(newUser);
      await sendGrid.sendVerificationEmail(Email, username, "users/signup");
      return res.status(201).json({
        status: 201,
        message: "User created! An email has been sent to you to verify your account"
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await User.emailExist(Email);
      if (!user) return res.status(404).json({ status: 404, error: "Email does not exist." });
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) return res.status(404).json({ status: 400, error: "Password is not correct!." });
      if (!user.active) {
        return res.status(403).send({ message: "Sorry User has been De-activated, Please contact an admin." });
      }
      if (!user.verified) {
        return res.status(400).send({ message: "Please Verify your account to continue. click on the link provided in your mail" });
      }
      const token = await generateToken({ user });
      return res.status(200).json({
        status: 200,
        message: "User Logged in Successfully",
        data: token
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserProfile(req, res) {
    try {
      const { id } = req.decoded.user;
      const { error } = profileValidate(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const updatedProfile = await User.updateUserProfile(id, req.body);
      return res.status(200).json({ status: 200, message: "User profile updated", data: updatedProfile[1] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      return res.status(200).json({ status: 200, message: "Successfully retrived all Users", data: users });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async verifyUser(req, res) {
    try {
      const updatedUser = await User.updateUserVerification(req.params.email);
      res.status(200).json({ status: 200, message: "User Verified successfully!", data: { email: updatedUser[1].email, username: updatedUser[1].username, verified: updatedUser[1].verified } });
    } catch (e) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}
