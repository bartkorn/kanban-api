const Item = require('../api/item');
const Category = require('../api/category');

const pg = require('pg');
const db = new pg.Client();
db.connect();

exports.getItem = Item.get(db);
exports.updateItem = Item.update(db);
exports.updateMany = Item.updateMany(db);
exports.deleteItem = Item.delete(db);
exports.addItem = Item.add(db);
exports.countItem = Item.count(db);
exports.getAllItems = Item.all(db);
exports.getMaxPriority = Item.maxPriority(db);

exports.getCategory = Category.get(db);
exports.updateCategory = Category.update(db);
exports.deleteCategory = Category.delete(db);
exports.addCategory = Category.add(db);
exports.countCategory = Category.count(db);
exports.getAllCategories = Category.all(db);
