module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query
    ("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
    .then(() => queryInterface.createTable("PaymentHistories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PaymentHistories');
  }
};