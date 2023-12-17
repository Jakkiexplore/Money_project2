const router = require('express').Router();
const { Budget } = require('../../models');

router.get('/', async (req, res) => {
  // find all budgets
  try {
    const budgetData = await Budget.findAll();

    res.json(budgetData);
  } catch (err) {
    console.error('Error fetching budgets', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one budget by its `id` value
  
    try {
      const budgetData = await Budget.findByPk(req.params.id);
  
      if (!budgetData) {
        res.status(404).json({ message: 'No budget found with that id!' });
        return;
      }
  
      res.status(200).json(budgetData);
    } catch (err) {
      res.status(500).json(err);
    }
 
});

router.post('/', async (req, res) => {
  // create a new budget
  try {
    const budgetData = await Budget.create(req.body);
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a budget by its `id` value
  try {
    const budgetData = await Budget.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!budgetData[0]) {
      res.status(404).json({ message: 'No budget found with this id!' });
      return;
    }
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;