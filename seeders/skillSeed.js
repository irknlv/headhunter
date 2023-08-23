'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Skill', [
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C#' },
      { name: 'SQL' },
      { name: 'Git' },
      { name: 'Angular' },
      { name: 'Vue.js' },
      { name: 'PHP' },
      { name: 'Ruby' },
      { name: 'Swift' },
      { name: 'TypeScript' },
      { name: 'C++' },
      { name: 'Rust' },
      { name: 'Machine Learning' },
      { name: 'Data Science' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Skill', null, {});
  },
};