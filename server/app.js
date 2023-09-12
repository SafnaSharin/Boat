var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
const bcrypt = require('bcrypt');
var connectDB=require('./config/db')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter =require('./routes/projectRouter')
var productRouter =require('./routes/productRouter')
var authMiddleware = require('./middleware/authmiddleware');
const bodyParser = require('body-parser');
const { truncate } = require('fs/promises');
var app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: truncate }));
app.use(cookieParser());
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use ('/projectRouter', projectRouter);
app.use('/productRouter', productRouter)
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError) {
//     return res.status(400).json({ message: 'Invalid JSON' });
//   }
//   // Handle other errors as needed
// });
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
// //console.log(req.body);
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
