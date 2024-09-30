const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const { User, Address } = require('./models/associations'); // Import models with associations

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database models
sequelize.sync().then(() => {
  console.log('Database connected and models synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// API route to register user and address
app.post('/register', async (req, res) => {
  try {
    const { name, street, city, postalCode } = req.body;

    // Create user
    const user = await User.create({ name });

    // Create address linked to the user
    const address = await Address.create({
      street,
      city,
      postalCode,
      UserId: user.id  // Ensure foreign key is set correctly
    });

    // Return the created user and address
    res.status(201).json({ user, address });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to register user and address' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
