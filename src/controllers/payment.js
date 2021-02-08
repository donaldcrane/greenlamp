import Payment from "../middleware/paystack";
import Admin from "../services/paymentHistory";

const { initializePayment, verifyPayment } = Payment;

/**
 * @class PaymentController
 * @description initialize, verify payment
 * @exports UserController
 */
export default class PaymentController {
/**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async initialize(req, res) {
    try {
      const { quantity } = req.body;
      const { id } = req.params;

      const weedDetails = await Admin.getWeed(id);
      if (!weedDetails) return res.status(404).json({ status: 404, error: "weed not found" });
      const subTotal = parseFloat(weedDetails.pricePerQty) * parseInt(quantity, 10);
      const paystack_data = {
        amount: subTotal * 100,
        email: req.decoded.user.email,
        productId: id
      };
      const response = await initializePayment(paystack_data);

      const payload = {
        userId: req.decoded.user.id,
        weedName: weedDetails.name,
        amountInNaira: subTotal,
        quantity,
        reference: response.data.reference,
        status: "pending",
      };
      await Admin.addPurchase(payload);
      return res.status(200).json({
        status: 200,
        message: response.data.authorization_url,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async verify(req, res) {
    try {
      const { trxref } = req.query;
      if (!trxref) return res.status(400).json({ status: 404, error: "No transaction reference found." });
      const payment_status = await verifyPayment(trxref);
      const {
        status, reference, amount, customer, authorization
      } = payment_status.data.data;
      const { email } = customer;
      const user = await Admin.emailExist(email);
      const { id } = user.dataValues;
      const payload = {
        userId: id,
        email,
        status,
        reference,
        amount: amount / 100
      };
      const saved = await Admin.addPaymentHistory(payload);
      return res.status(200).json({
        status: 200,
        message: "Payment was made successfully",
        data: saved
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
