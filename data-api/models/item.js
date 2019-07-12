const Utils = require('../utils/utils')

class Item {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save(dbHandle, cb) {
        const text = 'INSERT INTO item(created, started, finished, deadline, state_id, description, notes, category_id, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
        const values = [this.created, this.started, this.finished, this.deadline, this.state_id, this.description, this.notes, this.category_id, this.priority];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            const id = result.rows[0].id;
            this.id = id;
            cb(null, id);
        });
    }

    update(dbHandle, cb) {
        if (this.id) {
            const text = 'UPDATE item SET created = $1, started = $2, finished = $3, deadline = $4, state_id = $5, description = $6, notes = $7, category_id = $8, priority = $9 WHERE id = $10';
            const values = [this.created, this.started, this.finished, this.deadline, this.state_id, this.description, this.notes, this.category_id, this.priority, this.id];
            dbHandle.query(text, values, (err, result) => {
                if (err) cb(err);
                cb(null);
            });
        } else {
            this.save(dbHandle, cb);
        }
    }

    static getById(dbHandle, id, cb) {
        const text = 'SELECT * FROM item WHERE id = $1';
        const values = [id];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            if (result && result.rows.length > 0)
                cb(null, new Item(result.rows[0]));
            else
                cb(null, null);
        });
    }

    static deleteById(dbHandle, id, cb) {
        const text = 'DELETE FROM item WHERE id = $1';
        const values = [id];
        dbHandle.query(text, values, (err, result) => {
            if (err) cb(err);
            cb(null);
        });
    }

    static getCount(dbHandle, cb) {
        const text = 'SELECT COUNT(*) FROM item';
        dbHandle.query(text, (err, result) => {
            if (err) cb(err);
            cb(null, result.rows[0]);
        });
    }

    static getAll(dbHandle, cb) {
        const text = 'SELECT * FROM item';
        dbHandle.query(text, (err, results) => {
            if (err) cb(err);
            if (results && results.rows.length > 0){
                let items = [];
                for (let item of results.rows) {
                    items.push(new Item(item));
                }
                cb(null, items);
            }
            else
                cb(null, null);
        });
    }
}

module.exports = Item;

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
