

const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });



app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(express.static ('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/admin', require('./routes/adminroutes'));
app.use('/', require('./routes/frontroutes'));






app.listen( 8005, () => {
    console.log('je suis la')
  })
  