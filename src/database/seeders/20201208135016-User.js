import bcrypt from "bcryptjs";

const password = "12345";
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      id: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      email: "francis@gmail.com",
      username: "iamfrancis",
      password: hash,
      role: "Super Admin",
      verified: true,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      email: "ufuoma@gmail.com",
      username: "bellogo",
      password: hash,
      role: "Admin",
      verified: true,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      email: "fiyin@gmail.com",
      username: "fiyinsendev",
      password: hash,
      role: "User",
      verified: true,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      email: "godspower@gmail.com",
      username: "therealgodspower",
      password: hash,
      role: "User",
      verified: true,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
