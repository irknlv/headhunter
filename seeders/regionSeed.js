'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Country', [
      { name: 'Россия' },
      { name: 'Украина' },
      { name: 'Беларусь' },
      { name: 'Казахстан' },
      { name: 'Азербайджан' },
      { name: 'Армения' },
      { name: 'Грузия' },
      { name: 'Молдавия' },
      { name: 'Таджикистан' },
      { name: 'Туркменистан' },
      { name: 'Узбекистан' },
      { name: 'Кыргызстан' },
    ], {});

    await queryInterface.bulkInsert('City', [
      { name: 'Москва', countryId: 1 },
      { name: 'Санкт-Петербург', countryId: 1 },
      { name: 'Киев', countryId: 2 },
      { name: 'Харьков', countryId: 2 },
      { name: 'Минск', countryId: 3 },
      { name: 'Гродно', countryId: 3 },
      { name: 'Алматы', countryId: 4 },
      { name: 'Нур-Султан', countryId: 4 },
      { name: 'Баку', countryId: 5 },
      { name: 'Ереван', countryId: 6 },
      { name: 'Тбилиси', countryId: 7 },
      { name: 'Кишинев', countryId: 8 },
      { name: 'Душанбе', countryId: 9 },
      { name: 'Ашхабад', countryId: 10 },
      { name: 'Ташкент', countryId: 11 },
      { name: 'Бишкек', countryId: 12 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('City', null, {});
    await queryInterface.bulkDelete('Country', null, {});
  },
};