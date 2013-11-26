var express = require('express');
var routes = require('./routes.js');

var app = express();
app.use(express.bodyParser());
 
app.get('/', routes.getAll);
app.post('/', routes.create);
app.get('/:id', routes.get);
app.put('/:id', routes.update);
app.del('/:id', routes.del);
 
app.listen(3333);
console.log('Running on port 3333!');