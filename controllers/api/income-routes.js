const router = require('express').Router();
const { Income, Category, User } = require('../../models');

router.get('/', async (req, res) => {
  // find all incomes
  try {
    const incomeData = await Income.findAll({
      include: [{model: Category}],
      include: [{model: User}]
    });

    res.json(incomeData);
  } catch (err) {
    console.error('Error fetching incomes with associated user/categories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one income by its `id` values
  
    try {
      const incomeData = await Income.findByPk(req.params.id, {
        include: [{model: Category}],
        include: [{model: User}]
      });
  
      if (!incomeData) {
        res.status(404).json({ message: 'No income found with that id!' });
        return;
      }
  
      res.status(200).json(incomeData);
    } catch (err) {
      res.status(500).json(err);
    }
 
});

router.post('/', async (req, res) => {
  // create a new income
  try {
    const incomeData = await Income.create(req.body);
    res.status(200).json(incomeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a income by its `id` value
  try {
    const incomeData = await Income.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!incomeData[0]) {
      res.status(404).json({ message: 'No income found with this id!' });
      return;
    }
    res.status(200).json(incomeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a income by its `id` value
  try {
    const incomeData = await Income.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!incomeData) {
      res.status(404).json({ message: 'No income found with this id!' });
      return;
    }

    res.status(200).json(incomeData);
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
