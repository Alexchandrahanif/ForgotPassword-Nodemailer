"use strict";

const { hashingPassword } = require("../helper/helper");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataUser = require("../data/user.json");

    dataUser.forEach((el) => {
      el.uuid = uuidv4();
      el.password = hashingPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", dataUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
