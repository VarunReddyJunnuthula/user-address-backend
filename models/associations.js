const User = require('./user');
const Address = require('./address');

// Define associations
User.hasMany(Address, { foreignKey: 'UserId', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

module.exports = { User, Address };
