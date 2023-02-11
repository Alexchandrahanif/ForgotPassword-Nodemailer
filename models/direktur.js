"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Direktur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Direktur.hasMany(models.Company, {
        foreignKey: {
          name: "DirekturId",
          allowNull: true,
        },
      });
    }
  }
  Direktur.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Direktur",
    }
  );
  return Direktur;
};
