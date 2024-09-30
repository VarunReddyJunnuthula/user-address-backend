const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite as the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Path to SQLite file
});

// Export the connection
module.exports = sequelize;
