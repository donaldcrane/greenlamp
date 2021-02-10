import Admin from "../services/paymentHistory";
import { validateId } from "../validation/weedValidation";

/**
 * @class AdminWeedController
 * @description create weed, get all weeds, get a weed, delete a weed, update a weed
 * @exports AdminController
 */
export default class AdminPaymentHistoryController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getAllPaymentHistories(req, res) {
    try {
      const paymentHistories = await Admin.getPaymentHistories();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all payment Histories",
        data: paymentHistories,
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
  static async getPaymentHistory(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const paymentHistory = await Admin.getPaymentHistory(id);
      if (!paymentHistory) return res.status(404).json({ status: 404, error: "Payment History not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived payment History",
        data: paymentHistory,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }
}
