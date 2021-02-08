module.exports = (sequelize, DataTypes) => {
  const PaymentHistory = sequelize.define("PaymentHistories", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  PaymentHistory.associate = models => {
    PaymentHistory.belongsTo(models.Users, {
      as: "userPaymentHistory",
      foreignKey: "userId",
      onDelete: "cascade",
    });
  }
  return PaymentHistory;
};
