import Admin from "../services/weed";
import { validation, validateId } from "../validation/weedValidation";

/**
 * @class AdminWeedController
 * @description create weed, get all weeds, get a weed, delete a weed, update a weed
 * @exports AdminController
 */
export default class AdminWeedController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addWeed(req, res) {
    try {
      const { name, imageUrl, pricePerQty } = req.body;
      const { error } = validation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const weedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
      const weed = await Admin.checkWeed(weedName);

      if (weed) return res.status(409).json({ status: 409, error: "This weed already exists in the database" });
      const newWeed = { name: weedName, imageUrl, pricePerQty };
      const createdWeed = await Admin.addWeed(newWeed);
      return res.status(201).json({ status: 201, message: "A Weed has been added.", data: createdWeed, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getAllWeeds(req, res) {
    try {
      const weeds = await Admin.getAllWeeds();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all weeds",
        data: weeds,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error, });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getWeed(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const weed = await Admin.getWeed(id);
      if (!weed) return res.status(404).json({ status: 404, error: "weed not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived weed",
        data: weed,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async deleteweed(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const weed = await Admin.getWeed(id);
      if (!weed) return res.status(404).json({ status: 404, error: "weed not found" });
      await Admin.deleteWeed(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted weed",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateWeed(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const {
        name, imageUrl, pricePerQty
      } = req.body;
      const weed = await Admin.getWeed(id);
      if (!weed) return res.status(404).json({ status: 404, error: "weed not found" });
      let newname;
      if (name) {
        newname = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        req.body.name = newname;
      }
      const newWeed = await Admin.updateWeed(id, req.body);
      return res.status(200).json({
        status: 200,
        message: "Successfully updated weed",
        data: newWeed[1],
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
