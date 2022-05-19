'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Parity.init({
    hotelName: DataTypes.STRING,
    url: DataTypes.TEXT,
    vendor: DataTypes.STRING,
    checkinDate: DataTypes.DATE,
    checkoutDate: DataTypes.DATE,
    guest: DataTypes.INTEGER,
    stays: DataTypes.INTEGER,
    roomType: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sourceFile: DataTypes.STRING,
    sourcePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parity',
  });
  return Parity;
};