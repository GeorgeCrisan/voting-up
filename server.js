/*require npm modules----  */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const seesion = require('express-session');
const path = require('path');
const cors = require('cors');
//let port = 3200;
/* set up server */
dotenv.config();
console.log(process.env.MONGOLAB_URI);
const app = express();
const configDBase = require('./my_modules/database.js');

/*database code lines , later to move in they own module comonjs */

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname + '/client/build/')));

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname + '/client/build/index.html'));

});

app.listen( process.env.PORT, ()=> console.log(`runing at ${ process.env.PORT}`) );