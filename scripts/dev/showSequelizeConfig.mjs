import sequelize from '../../config/database.js';

console.log('Sequelize config dialect:', sequelize.getDialect && sequelize.getDialect());
console.log('Sequelize options:', sequelize.options);
process.exit(0);