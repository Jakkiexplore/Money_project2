const sequelize = require('../config/connection');
const { User, Category, Expense, Budget, Income } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const expenseData = require('./expenseData.json');
const budgetData = require('./budgetData.json');
const incomeData = require('./incomeData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Expense.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Budget.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Income.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
  
};

seedDatabase();
