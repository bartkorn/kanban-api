const Utils = require('../utils/utils')

class Category {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save(dbHandle, cb) {
        const text = 'INSERT INTO category (name) VALUES ($1) RETURNING id';
        const values = [this.name];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            const id = result.rows[0].id;
            this.id = id;
            cb(null, id);
        });
    }

    update(dbHandle, cb) {
        if (this.id) {
            const text = 'UPDATE category SET name = $1 WHERE id = $2';
            const values = [this.name, this.id];
            dbHandle.query(text, values, (err, result) => {
                if (err) cb(err);
                cb(null);
            });
        } else {
            this.save(dbHandle, cb);
        }
    }

    static getById(dbHandle, id, cb) {
        const text = 'SELECT * FROM category WHERE id = $1';
        const values = [id];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            if (result && result.rows.length > 0)
                cb(null, new Category(result.rows[0]));
            else
                cb(null, null);
        });
    }

    static deleteById(dbHandle, id, cb) {
        const text = 'DELETE FROM category WHERE id = $1';
        const values = [id];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            cb(null);
        });
    }

    static getCount(dbHandle, cb) {
        const text = 'SELECT COUNT(*) FROM category';
        dbHandle.query(text, (err, result) => {
            if (err) cb(err);
            cb(null, result.rows[0]);
        });
    }

    static getAll(dbHandle, cb) {
        const text = 'SELECT * FROM category';
        dbHandle.query(text, (err, results) => {
            if (err) cb(err);
            if (results && results.rows.length > 0) {
                let categories = [];
                for (let category of results.rows) {
                    categories.push(new Category(category));
                }
                cb(null, categories);
            } else {
                cb(null, null);
            }
        });
    }
}

module.exports = Category;

/*
const item = new Item({
    created: Utils.formatDateTime(new Date()),
    started: null,
    finished: null,
    deadline: Utils.formatDateTime(new Date()),
    state_id: 2,
    description: 'Get construction agreement',
    notes: 'Prepare and fill the form, send to City Town Hall',
    category_id: 1
});

item.save((err, id) => {
    if (err) throw err;
    console.log('Inserted row with id %s', id);
})
*/