const router = require('express').Router();

const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');
const expenseRoutes = require('./expense-routes');
const incomeRoutes = require('./income-routes');
const budgetRoutes = require('./budget-routes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/expenses', expenseRoutes);
router.use('/incomes', incomeRoutes);
router.use('/budgets', budgetRoutes);

module.exports = router;
