'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Experience', [
      { duration: 'Нет опыта' },
      { duration: 'от 1 года до 3 лет' },
      { duration: 'от 3 года до 6 лет' },
      { duration: 'Более 6 лет' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Experience', null, {});
  },
};