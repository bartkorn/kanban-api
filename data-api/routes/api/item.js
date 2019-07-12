const Item = require('../../models/item');

exports.get = (db) => {
    return (req, res, next) => {
        Item.getById(db, req.params.id, (err, item) => {
            if (err) return next(err);
            if (!item) return res.sendStatus(404);
            res.json(item);
        });
    };
};

exports.add = (db) => {
    return (req, res, next) => {
        const item = new Item({
            created: req.body.created,
            started: req.body.started,
            finished: req.body.finished,
            deadline: req.body.deadline,
            state_id: req.body.state_id,
            description: req.body.description,
            notes: req.body.notes,
            category_id: req.body.category_id,
            priority: req.body.priority
        });
        item.save(db, (err, id) => {
            if (err) return next(err);
            res.json(`Item successfully added with id = ${id}`);
        });
    };
};



exports.update = (db) => {
    return (req, res, next) => {
        Item.getById(db, req.params.id, (err, item) => {
            if (err) return next(err);
            if (!item) return res.sendStatus(404);
            for (let key in req.body)
                item[key] = req.body[key];
            item.update(db, (err) => {
                if (err) next(err);
                res.json(`Item with id = ${req.params.id} successfully updated`);
            });
        });
    };    
};


exports.delete = (db) => {
    return (req, res, next) => {
        Item.deleteById(db, req.params.id, (err) => {
            if (err) return next(err);
            res.json("Item successfully deleted.");
        });
    };    
};

exports.count = (db) => {
    return (req, res, next) => {
        Item.getCount(db, (err, count) => {
            if (err) return next(err);
            res.json(count);
        });
    };
};

exports.all = (db) => {
    return (req, res, next) => {
        Item.getAll(db, (err, items) => {
            if (err) return next(err);
            res.json(items);
        });
    };
};

