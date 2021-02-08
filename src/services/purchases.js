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
   * @returns {object} An instance of the purchases model class
   */
  static async getAllPurchases() {
    try {
      return await database.Purchases.findAll({ });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The purchase id
   * @returns {object} An instance of the purchases model class
   */
  static async getPurchase(id) {
    try {
      return await database.Purchases.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The purchase name
   * @returns {object} An instance of the purchases model class
   */
  static async deletePurchase(id) {
    try {
      const purchase = await database.Purchases.findOne({ where: { id } });
      return await purchase.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old purchase id
   * @param {string} purchase - The new purchase details
   * @returns {object} An instance of the purchases model class
   */
  static async updatePurchase(id, purchase) {
    try {
      return await database.Purchases.update(purchase, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
