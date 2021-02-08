module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Purchases", [{
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      weedName: "Naija(normal weed)",
      amountInNaira: 500,
      reference: "14523635521455332155221152",
      quantity: 5,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      weedName: "Marley(Kush)",
      amountInNaira: 2000,
      quantity: 5,
      reference: "14523635521455332155221156",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      weedName: "LOUD",
      amountInNaira: 2500,
      reference: "14523635521455332155221154",
      quantity: 5,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { 
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      weedName: "COLORADO",
      amountInNaira: 3500,
      reference: "14523635521455332155221153",
      quantity: 5,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
