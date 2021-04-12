import Admin from "../services/purchases";
import { validation, validateId } from "../validation/purchaseValidation";

/**
 * @class AdminPurchasesController
 * @description create purchase, get all purchases, get a purchase, delete a purchase, update a purchase
 * @exports AdminController
 */
export default class AdminPurchasesController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getAllPurchases(req, res) {
    try {
      const purchases = await Admin.getAllPurchases();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all purchases",
        data: purchases,
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
  static async getPurchase(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const purchase = await Admin.getPurchase(id);
      if (!purchase) return res.status(404).json({ status: 404, error: "purchase not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived purchase",
        data: purchase,
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
  static async deletepurchase(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const purchase = await Admin.getPurchase(id);
      if (!purchase) return res.status(404).json({ status: 404, error: "purchase not found" });
      await Admin.deletePurchase(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted purchase",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }
}
