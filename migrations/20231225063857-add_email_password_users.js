"use strict";
const { sequelize } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "email",
          {
            allowNull: false,
            unique: true,
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Users",
          "password",
          {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Users", "email", { transaction: t }),
        queryInterface.removeColumn("Users", "password", { transaction: t })
      ]);
    });
  },
};
