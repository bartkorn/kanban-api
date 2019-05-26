const Item = require('../models/item');
const Utils = require('../utils/utils');
const assert = require('assert');
const pg = require('pg');
const db = new pg.Client();
const item = new Item({
    created: Utils.formatDateTime(new Date()),
    started: null,
    finished: null,
    deadline: Utils.formatDateTime(new Date()),
    state_id: 2,
    description: 'Test',
    notes: 'Test',
    category_id: 1
});

describe('dbItemTest', () => {
    before(()=>{
        db.connect();
    });
    describe('insert query', () => {
        before((done) => {            
            db.query(`
            DROP TABLE IF EXISTS Item;
            CREATE TABLE public.item (
                id SERIAL,
                created timestamp(2) without time zone,
                started timestamp(2) without time zone,
                finished timestamp(2) without time zone,
                deadline timestamp(2) without time zone,
                state_id integer,
                description character varying,
                notes character varying,
                category_id integer
            );`, (err) => {
                assert(err == null);
                done();
            })
        });
        it('should insert new Item to database', (done) => {         
            item.save(db, (err, id) => {
                assert(err == null);
                assert(id > 0);
                done();
            });
        });
        it('should return existing Item from database', (done) => {
            Item.getById(db, 1, (err, item) => {
                assert(err == null);
                assert(item != null);
                assert(item.id == 1);
                assert(item.description == 'Test');
                done();
            })
        });
        it('should update existing Item in database', (done) => {
            item.description = 'Test2';
            item.update(db, (err) => {
                assert(err == null);
                Item.getById(db, 1, (err, updatedItem) => {
                    assert(err == null);
                    assert(updatedItem.description == 'Test2');
                    done();
                });
            });
        });
        it('should update non-existing Item in database', (done) => {
            const newItem = new Item({
                created: Utils.formatDateTime(new Date()),
                started: null,
                finished: null,
                deadline: Utils.formatDateTime(new Date()),
                state_id: 2,
                description: 'Test New',
                notes: 'Test New',
                category_id: 1
            });
            newItem.update(db, (err, id) => {
                assert(err == null);
                assert(id == 2);
                done();
            });
        });
        it('should get count of items in database', (done) => {
            Item.getCount(db, (err, count) => {
                assert(err == null);
                assert(parseInt(count.count) == '2');
                done();
            })
        });
        it('should get all items from database', (done) => {
            Item.getAll(db, (err, items) => {
                assert(err == null);
                assert(items[0].id == 1);
                assert(items[1].id == 2);
                done();
            })
        });
        it('should delete Item from database', (done) => {
            Item.deleteById(db, 1, (err) => {
                assert(err == null);
                Item.getById(db, 1, (err, item) => {
                    assert(err == null);
                    assert(item == null);
                    done();
                });
            });
        });
        after(() => {
            //todo
        });
    });
    after(()=>{
        db.end();
    });
})