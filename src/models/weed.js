module.exports = (sequelize, DataTypes) => {
  const Weed = sequelize.define("Weeds", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricePerQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Weed;
};