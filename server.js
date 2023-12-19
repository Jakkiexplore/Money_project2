const path = require('path');
<<<<<<< HEAD
const routes = require('./controllers');
const hbs = exphbs.create( );
=======
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
>>>>>>> main

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

<<<<<<< HEAD
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
=======
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// Configure and link a session object with the sequelize store
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// Add express-session and store as Express.js middleware
// app.use(session(sess));
>>>>>>> main

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
<<<<<<< HEAD

=======
>>>>>>> main

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port:', PORT));
}).catch((error) => {
  console.error('Error syncing database:', error);
});
