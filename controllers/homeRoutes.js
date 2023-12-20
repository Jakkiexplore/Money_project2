const router = require('express').Router();
const { User, Budget, Income, Expense } = require('../models');


router.get('/', async (req, res) => {
  try {
    res.render('home',{
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/home-back-img.jpg'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', async (req, res) => {
  try {
    res.render('home', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/home-back-img.jpg'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
 

  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/budget', async (req, res) => {
  try {
    const budgetData = await Budget.findAll();
    const budgets = budgetData.map((budget) =>
    budget.get({ plain: true })
  );
    console.log(req.session)
    res.render('budget', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg',
      budgets
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/income', async (req, res) => {
  try {
    console.log(req.session)
    const incomeData = await Income.findAll({
      where: {
        user_id: req.session.user_id
      },
  });
  console.log(incomeData)

    const incomes = incomeData.map((income) =>
    income.get({ plain: true })
  );
    res.render('income', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg',
      incomes
    });
  } catch (err) {
    res.render('income', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg',
  
    });
  }
});

router.get('/expense', async (req, res) => {
  try {
    const expenseData = await Expense.findAll({
      where: {
        user_id: req.session.user_id
      },
  });
  
    const expenses = expenseData.map((expense) =>
    expense.get({ plain: true })
  );
    res.render('expense', {
      expenses: expenses, 
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login', {
    backgroundImage: '/images/home-back-img.jpg'
  });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'signup' template
  res.render('signup', {
    backgroundImage: '/images/home-back-img.jpg'
  });
});

module.exports = router;
