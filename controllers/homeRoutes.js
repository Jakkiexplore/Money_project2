const router = require('express').Router();
const { User, Budget, Income, Expense, Category } = require('../models');

router.get("/", async (req, res) => {
  try {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/home-back-img.jpg",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", async (req, res) => {
  try {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/home-back-img.jpg",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  //-------- Expense chart data
  const expenseChartData = {
    labels: ["Health", "Rent", "Entertainment", "Home Improvement", "Food"],
    datasets: [
      {
        data: [30, 25, 20, 10, 14],
        backgroundColor: [
          "#9ACD32",
          "#FFA07A",
          "#ADD8E6",
          "#FFE4B5",
          "#B0C4DE",
        ],
      },
    ],
  };

  //-------- Income chart data
  const incomeChartData = {
    labels: ["Salary", "Interest", "Capital Gains"],
    datasets: [
      {
        data: [50, 10, 40],
        backgroundColor: ["#FFA07A", "#87CEEB", "#D2B48C"],
      },
    ],
  };

  //-------- Bar chart data

  const barGraphData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "MONTHLY EXPENSE",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 65, 72, 58, 68],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  // ------------

  try {
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      expenseChartData,
      incomeChartData,
      barGraphData,
      backgroundImage: "/images/background-img.jpg",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/budget", async (req, res) => {
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

router.get("/income", async (req, res) => {
  try {
    console.log(req.session)
    const incomeData = await Income.findAll({
      include: [{model: Category}],
      where: {
        user_id: req.session.userid
      },
  });
  console.log(incomeData);

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

router.get("/expense", async (req, res) => {
  try {
    const expenseData = await Expense.findAll({
      include: [{model: Category}],
      where: {
        user_id: req.session.userid
      },
  });
  
    const expenses = expenseData.map((expense) =>
    expense.get({ plain: true })
  );
    res.render('expense', {
      loggedIn: req.session.loggedIn,
      backgroundImage: '/images/background-img.jpg',
      expenses
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login", {
    backgroundImage: "/images/home-back-img.jpg",
  });
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'signup' template
  res.render("signup", {
    backgroundImage: "/images/home-back-img.jpg",
  });
});

module.exports = router;
