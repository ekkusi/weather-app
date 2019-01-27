const express = require('express');
const hbs = require('hbs');
const path = require('path');

const router = require('./router/router')

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});