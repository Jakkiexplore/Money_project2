const router = require('express').Router();
const { Expense, Category, User } = require('../../models');

router.get('/', async (req, res) => {
  // find all expenses
  try {
    const expenseData = await Expense.findAll({
      include: [{model: Category}],
      include: [{model: User}]
    });

    res.json(expenseData);
  } catch (err) {
    console.error('Error fetching expenses with associated user/categories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one expense by its `id` values
  
    try {
      const expenseData = await Expense.findByPk(req.params.id, {
        include: [{model: Category}],
        include: [{model: User}]
      });
  
      if (!expenseData) {
        res.status(404).json({ message: 'No expense found with that id!' });
        return;
      }
  
      res.status(200).json(expenseData);
    } catch (err) {
      res.status(500).json(err);
    }
 
});

router.post('/', async (req, res) => {
  // create a new Expense
  try {
    const expenseData = await Expense.create(req.body);
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a expense by its `id` value
  try {
    const expenseData = await Expense.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!expenseData[0]) {
      res.status(404).json({ message: 'No expense found with this id!' });
      return;
    }
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a expense by its `id` value
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with this id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


