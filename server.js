/*require npm modules----  */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const seesion = require('express-session');
const path = require('path');
const cors = require('cors');
const database = require(path.join(__dirname + '/my_modules/database.js'));
let port = 3200;
/* set up server */
dotenv.config();

const app = express();
//import temporary model



app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname + '/client/build/')));


/*database code lines , later to move in they own module comonjs */
mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection; 

db.on('error', console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log('running the db');
    

    app.get('/',(req,res)=>{
    
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    
    });
    

    database();
    

    

    
    
                               

});



app.listen( process.env.PORT || port, ()=> console.log(`runing at ${ process.env.PORT || port} and ${process.env.MONGOLAB_URI}`));