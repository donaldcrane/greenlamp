import database from "../models";

/**
 * @class Admin
 * @description allows admin user create and check weed details
 * @exports Admin
 */
export default class Admin {
  /**
   * @param {string} newWeed - The state details
   * @returns {object} An instance of the Weeds model class
   */
  static async addWeed(newWeed) {
    try {
      return await database.Weeds.create(newWeed);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} weedName - The weed name
   * @returns {object} An instance of the Weeds model class
   */
  static async checkWeed(weedName) {
    try {
      const stringWeed = String(weedName);
      const Name = stringWeed[0].toUpperCase() + stringWeed.slice(1).toLowerCase();
      return await database.Weeds.findOne({ where: { name: Name } });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Weeds model class
   */
  static async getAllWeeds() {
    try {
      return await database.Weeds.findAll({ });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The weed id
   * @returns {object} An instance of the Weeds model class
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
   * @param {string} id - The weed name
   * @returns {object} An instance of the Weeds model class
   */
  static async deleteWeed(id) {
    try {
      const weed = await database.Weeds.findOne({ where: { id } });
      return await weed.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old state name
   * @param {string} weed - The new state details
   * @returns {object} An instance of the Weeds model class
   */
  static async updateWeed(id, weed) {
    try {
      return await database.Weeds.update(weed, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
