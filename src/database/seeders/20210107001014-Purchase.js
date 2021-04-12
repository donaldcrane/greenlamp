module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Purchases", [{
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9a",
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
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97f",
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
      id: "a430e505-937b-4908-9422-7aa57044e85c",
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
      id: "c375c640-81ff-405a-89a8-460ea2f71756",
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
