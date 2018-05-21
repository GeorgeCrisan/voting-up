/*require npm modules----  */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const faicon = require('serve-favicon');
const morgan = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
const path = require('path');
const cors = require('cors');
const database = require(path.join(__dirname + '/my_modules/database.js'));
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);;
const pollrouter = require(path.join(__dirname + '/my_modules/routes/pollrouter.js'));
const usersrouter = require(path.join(__dirname + '/my_modules/routes/usersrouter.js'));
var User = require(path.join(__dirname + '/my_modules/models/user-model.js'));
let port = 8333;
/* set up server */

dotenv.config();
const app = express();
var store = new MongoDBStore({
    uri: process.env.MONGOLAB_URI ,
        databaseName: 'voteupdb',
        collection: 'mySessions'
},
function(error) {
    if(error)
      console.log(error + 'from store');
  });

  store.on('error', function(error) {
    if(error)
      console.log(error + 'from store on error bit');
  });

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(morgan('dev'));
app.use(cors());
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

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(pollrouter);
app.use(usersrouter);

app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname + '/client/build/index.html'));

});






app.use((req,res,next)=>{
      let err = new Error('Eroor not found');
      err.status = 404;
      next(err);
});


app.listen( process.env.PORT || port, ()=> console.log(`runing at ${ process.env.PORT || port} and ${process.env.MONGOLAB_URI}`));
