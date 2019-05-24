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

//Item
app.get('/api/item/:id', api.getItem);
app.delete('/api/item/:id', api.deleteItem);
app.post('/api/item', api.addItem);
app.post('/api/item/:id', api.updateItem);

//Category
app.get('/api/category/:id', api.getCategory);
app.delete('/api/category/:id', api.deleteCategory);
app.post('/api/category', api.addCategory);
app.post('/api/category/:id', api.updateCategory);

module.exports = app;
