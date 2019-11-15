var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var api = require('./routes/api/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Item
app.get('/api/item/:id', api.getItem);
app.delete('/api/item/:id', api.deleteItem);
app.post('/api/item', api.addItem);
app.post('/api/item/:id', api.updateItem);
app.post('/api/items', api.updateMany);
app.get('/api/items/count', api.countItem);
app.get('/api/items/all', api.getAllItems);
app.get('/api/items/max_priority', api.getMaxPriority);


//Category
app.get('/api/category/:id', api.getCategory);
app.delete('/api/category/:id', api.deleteCategory);
app.post('/api/category', api.addCategory);
app.post('/api/category/:id', api.updateCategory);
app.get('/api/categories/count', api.countCategory);
app.get('/api/categories/all', api.getAllCategories);

module.exports = app;
