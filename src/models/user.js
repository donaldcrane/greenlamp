module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM("Super Admin", "Admin", "User"),
      defaultValue: "User",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  User.associate = models => {
    User.hasMany(models.Purchases, {
      as: "purchases",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
    User.hasMany(models.PaymentHistories, {
      as: "userHistory",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return User;
};
