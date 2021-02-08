module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PaymentHistories", [{
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      email: "francis@gmail.com",
      status: "Success",
      reference: "14523635521455332155221152",
      amount: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      email: "ufuoma@gmail.com",
      status: "Success",
      reference: "14523635521455332155221156",
      amount: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      email: "fiyin@gmail.com",
      status: "Success",
      reference: "14523635521455332155221154",
      amount: 2500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      email: "godspower@gmail.com",
      status: "Success",
      reference: "14523635521455332155221153",
      amount: 3500,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
