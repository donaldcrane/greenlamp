import database from "../models";

/**
 * @class User
 * @description User services
 * @exports User
 */
export default class User {
  /**
   * @param {string} username - The user name
   * @returns {object} - An instance of the Users model class
   */
  static async usernameExist(username) {
    try {
      const usernameExist = await database.Users.findOne({
        where: {
          username
        }
      });
      return usernameExist;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} googleId - The user googleId name
   * @returns {object} - An instance of the Users model class
   */
  static async googleUserExist(googleId) {
    try {
      const usernameExist = await database.Users.findOne({
        where: {
          googleId
        }
      });
      return usernameExist;
    } catch (error) {
      throw error;
    }
  } /**
   * @param {string} id - The user id
   * @returns {object} - An instance of the Users model class
   */

  static async userExist(id) {
    try {
      const userExist = await database.Users.findOne({
        where: {
          id
        }
      });
      return userExist;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns {object} An instance of the comment class
   */
  static async getAllUsers() {
    try {
      //
      return await database.Users.findAll({
        include: [
          { model: database.Purchases, as: "purchases" },
          { model: database.PaymentHistories, as: "userHistory" }
        ]
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

  /**
   * @param {object} newUser - The user details
   * @returns {object} - An instance of the Users model class
   */
  static async createUser(newUser) {
    try {
      const createUser = await database.Users.create(newUser);
      const userToUpdate = await database.Users.findOne({
        where: {
          id: createUser.id
        }
      });
      if (userToUpdate) {
        const newProfile = {
          userId: userToUpdate.id
        };
        await database.Profiles.create(newProfile);
        return createUser;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} email - The user email
   * @returns {object} - An instance of the Users model class
   */
  static async updateUserVerification(email) {
    try {
      return await database.Users.update({
        verified: true
      }, {
        where: {
          email
        },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} id - The user id
   * @param {string} profile - The user profile details
   * @returns {object} - An instance of the Profile model class
   */
  static async updateUserProfile(id, profile) {
    try {
      return await database.Profiles.update(profile, {
        where: { userId: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * @param {string} id - The user id
   * @param {string} password - The user password details
   * @returns {object} - An instance of the Profile model class
   */

  static async updateUserPassword(id, password) {
    try {
      return await database.Users.update(password, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }
}
