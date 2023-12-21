const router = require("express").Router();
const { User, Budget, Income, Expense, Category } = require("../models");

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
          "rgba(154, 205, 50, 0.6)",  
          "rgba(255, 160, 122, 0.6)",  
          "rgba(173, 216, 230, 0.6)",  
          "rgba(255, 228, 181, 0.6)", 
          "rgba(176, 196, 222, 0.6)", 
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
        backgroundColor: ["rgba(255, 160, 122, 0.6)", "rgba(135, 206, 235, 0.6)", "rgba(210, 180, 140, 0.6)"],
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

  //-----line chart
  const lineChartData = {
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
        label: "INCOME TREND",
        data: [65, 59, 80, 81, 56, 55, 40, 34, 67, 34, 78, 85],
        fill: false,
        borderColor: "yellow",
        tension: 0.1,
      },
    ],
  };

  try {
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      expenseChartData,
      incomeChartData,
      barGraphData,
      lineChartData,
      backgroundImage: "/images/background-img.jpg",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/budget", async (req, res) => {
  try {
    const budgetData = await Budget.findAll();
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));
  
    res.render("budget", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
      budgets,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/income", async (req, res) => {
  try {
    const incomeData = await Income.findAll({
      include: [{ model: Category }],
      where: {
        user_id: req.session.userId,
      },
    });
  
    const incomes = incomeData.map((income) => income.get({ plain: true }));

    res.render("income", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
      incomes,
    });
  } catch (err) {
    console.log(err);
    res.render("income", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
    });
  }
});

router.get("/expense", async (req, res) => {
  try {
    const expenseData = await Expense.findAll({
      include: [{ model: Category }],
      where: {
        user_id: req.session.userId,
      },
    });

    const expenses = expenseData.map((expense) => expense.get({ plain: true }));
    res.render("expense", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      backgroundImage: "/images/background-img.jpg",
      expenses,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/income-add", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      where: {
        type: "Income"
      },
    });
  
    const categories = categoryData.map((category) => category.get({ plain: true }));
  
    res.render("income-add", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      categories,
      backgroundImage: "/images/background-img.jpg",
    });

  } catch(err) {
    res.render("income-add", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
    });
  }
  
});

router.get("/income-delete/:id", async (req, res) => {
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

    const dbData = await Income.findAll({
      include: [{ model: Category }],
      where: {
        user_id: req.session.userId,
      },
    });
  
    const incomes = dbData.map((income) => income.get({ plain: true }));


    res.render("income", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
      incomes,
    });

  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/expense-add", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      where: {
        type: "Expense"
      },
    });
  
    const categories = categoryData.map((category) => category.get({ plain: true }));
  
    res.render("expense-add", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      categories,
      backgroundImage: "/images/background-img.jpg",
    });

  } catch(err) {
    res.render("expense-add", {
      loggedIn: req.session.loggedIn,
      backgroundImage: "/images/background-img.jpg",
    });
  }
});

router.get("/expense-delete/:id", async (req, res) => {
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

    const dbData = await Expense.findAll({
      include: [{ model: Category }],
      where: {
        user_id: req.session.userId,
      },
    });

    const expenses = dbData.map((expense) => expense.get({ plain: true }));
    res.render("expense", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      backgroundImage: "/images/background-img.jpg",
      expenses,
    });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
