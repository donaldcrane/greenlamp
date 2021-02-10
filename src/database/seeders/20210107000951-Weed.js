module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Weeds", [{
      id: "015494a8-5115-4e3e-ba84-6d08b9d2e08f",
      name: "Naija(normal weed)",
      pricePerQty: 100,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "09e226bb-73db-4fc8-aaf6-ab371c2cc189",
      name: "SK(skunk)",
      pricePerQty: 200,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "015494a8-5115-4e3e-ba84-6d08b9d2e08e",
      name: "AZ(Arizona)",
      pricePerQty: 300,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "54070e3b-8ea1-4267-818e-bdb489e2ace8",
      name: "Marley(Kush)",
      pricePerQty: 400,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "0a973445-7f4e-412d-a880-96a7f708cc62",
      name: "LOUD",
      pricePerQty: 500,
      imageUrl: "http:/facebook.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "330547ae-d310-4b4b-a70e-a11eb9dde8f9",
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
