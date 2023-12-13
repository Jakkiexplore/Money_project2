const User = require("./User.js");
const Category = require("./Category.js");
const Expense = require("./Expense.js");
const Budget = require("./Budget.js");

// Expense belongsTo Category
Expense.belongsTo(User, {
  foreignKey: "user_id",
});

// Categories have many expenses
User.hasMany(Expense, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Expense belongsTo Category
Expense.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many expenses
Category.hasMany(Expense, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Category,
  Budget,
  Expense,
};
