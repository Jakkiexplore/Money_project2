
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});