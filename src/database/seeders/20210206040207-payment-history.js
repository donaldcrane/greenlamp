module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("PaymentHistories", [{
      id: "12adedc3-d529-4f67-9ee6-5b763d5010f4",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      email: "francis@gmail.com",
      status: "Success",
      reference: "14523635521455332155221152",
      amount: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "63995ef8-351f-4035-a268-c6cd7697f0ef",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      email: "ufuoma@gmail.com",
      status: "Success",
      reference: "14523635521455332155221156",
      amount: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "09015644-4195-417f-8934-7cdc6e8519e2",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      email: "fiyin@gmail.com",
      status: "Success",
      reference: "14523635521455332155221154",
      amount: 2500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6003fb36-5112-463e-a1f9-c8944e72412f",
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
