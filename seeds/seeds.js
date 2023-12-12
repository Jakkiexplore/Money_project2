const sequelize = require('../config/connection');
const { User, Category, Expense } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const expenseData = require('./expenseData.json');

const seedDatabase = async () => {
  // add sequelize data create logic later

  process.exit(0);
  
};

seedDatabase();
