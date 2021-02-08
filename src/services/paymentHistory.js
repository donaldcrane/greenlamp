import database from "../models";

/**
 * @class Admin
 * @description allows admin user create and check purchase details
 * @exports Admin
 */
export default class Admin {
  /**
   * @param {string} newpurchase - The purchase details
   * @returns {object} An instance of the purchases model class
   */
  static async addPurchase(newpurchase) {
    try {
      return await database.Purchases.create(newpurchase);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} newpaymentHistory - The paymentHistory details
   * @returns {object} An instance of the paymentHistory model class
   */
  static async addPaymentHistory(newpaymentHistory) {
    try {
      return await database.PaymentHistories.create(newpaymentHistory);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The paymentHistory id
   * @returns {object} An instance of the paymentHistory model class
   */
  static async getPaymentHistory(id) {
    try {
      return await database.PaymentHistories.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the paymentHistory model class
   */
  static async getPaymentHistories() {
    try {
      return await database.PaymentHistories.findAll({});
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The weed id
   * @returns {object} An instance of the weed model class
   */
  static async getWeed(id) {
    try {
      return await database.Weeds.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} email  - The user email
   * @returns {object} - An instance of the Users model class
   */
  static async emailExist(email) {
    try {
      return await database.Users.findOne({
        where: {
          email
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
