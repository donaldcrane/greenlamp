module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchases", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    weedName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Weeds",
        key: "name",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountInNaira: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Purchase.associate = models => {
    Purchase.belongsTo(models.Users, {
      as: "userPurchase",
      foreignKey: "userId",
      onDelete: "cascade",
    });
    Purchase.belongsTo(models.Weeds, {
      as: "weedPurchases",
      foreignKey: "weedName",
      onDelete: "cascade",
    });
  }
  return Purchase;
};