'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'lee.admin@gmail.com',
        password: '123456', //plain text or "sfda124d" -> hash password
        firstName: 'Lee',
        lastName: 'Ngoc',
        address: 'Ha Noi',
        phonenumber: '0922463233',
        gender: 1,
        image: '....',
        roleId: '',
        positionId: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
