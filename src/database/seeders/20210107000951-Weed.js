module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Weeds", [{
      name: "Naija(normal weed)",
      pricePerQty: 100,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "SK(skunk)",
      pricePerQty: 200,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "AZ(Arizona)",
      pricePerQty: 300,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Marley(Kush)",
      pricePerQty: 400,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "LOUD",
      pricePerQty: 500,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "COLORADO",
      pricePerQty: 700,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
