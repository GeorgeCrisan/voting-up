/*require npm modules----  */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const faicon = require('serve-favicon');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
let passportStrategyJwt = require(path.join(__dirname+ '/my_modules/routes/passport.js'));


const pollrouter = require(path.join(__dirname + '/my_modules/routes/pollrouter.js'));
const usersrouter = require(path.join(__dirname + '/my_modules/routes/usersrouter.js'));
let port = 8333;
/* set up server */

dotenv.config();
const app = express();

app.disable('x-powered-by');
app.use(helmet());





app.use(morgan('dev'));
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname + '/client/build/')));


/*database code lines , later to move in they own module comonjs */
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGOLAB_URI,{promiseLibrary: require('bluebird')} );

var db = mongoose.connection;



db.on('error', console.error.bind(console,'connection error: database did not open for some reason!'));

db.once('open',function(){
    console.log('databse connection enstablished and open!');
});


passportStrategyJwt();

app.use(usersrouter);
app.use(pollrouter);


app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname + '/client/build/index.html'));

});



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  });


//error handler 
app.use((err,req,res,next)=>{

    if(err){
        res.status = err.status;
        res.json({'error':err ,middleware: 'error end 404'});
    }
});



  
app.listen( process.env.PORT || port, ()=> console.log(`runing at ${ process.env.PORT || port} and ${process.env.MONGOLAB_URI}`));
