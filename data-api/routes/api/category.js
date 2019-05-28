const Category = require('../../models/category');

exports.get = (db) => {
    return (req, res, next) => {
        Category.getById(db, req.params.id, (err, category) => {
            if (err) return next(err);
            if (!category) return res.sendStatus(404);
            res.json(category);
        });
    };
};

exports.add = (db) => {
    return (req, res, next) => {
        const category = new Category({
            name: req.body.name
        });
        category.save(db, (err, id) => {
            if (err) return next(err);
            res.json(`Category successfully added with id = ${id}`);
        });
    };
};

exports.update = (db) => {
    return (req, res, next) => {
        Category.getById(db, req.params.id, (err, category) => {
            if (err) return next(err);
            if (!category) return res.sendStatus(404);
            for (let key in req.body)
                category[key] = req.body[key];
            category.update(db, (err) => {
                if (err) next(err);
                res.json(`Category with id = ${req.params.id} successfully updated`);
            });
        });
    };
}; 

exports.delete = (db) => {
    return (req, res, next) => {
        Category.deleteById(db, req.params.id, (err) => {
            if (err) return next(err);
            res.json("Category successfully deleted.");
        });
    };
}; 

exports.count = (db) => {
    return (req, res, next) => {
        Category.getCount(db, (err, count) => {
            if (err) return next(err);
            res.json(count);
        });
    };
};

exports.all = (db) => {
    return (req, res, next) => {
        Category.getAll(db, (err, categories) => {
            if(err) return next(err);
            res.json(categories);
        });
    };
};