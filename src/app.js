const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config('../');
require('./database/connection');
const routers = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.set('PORT', process.env.PORT || 8001);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', routers);

app.listen(app.get('PORT'), async () => {
  console.log('server listen on port', app.get('PORT'));
});
