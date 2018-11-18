// create app and server
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// include routing
// var router = require('./routing/index');
var database = require('./routing/database');

// secret and cookie
app.use(express.static('public'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var cookieParser = require('cookie-parser');
var helmet = require('helmet');
app.use(helmet());
app.use(cookieParser());


app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

// use router ./routing/index.js
// app.use('/', router);
app.use('/database', database);


var port = 3000;
// create server
http.listen(port, function() {
  console.log(`server working on ${port} port!`);
});
