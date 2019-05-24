const Category = require('../models/category');
const assert = require('assert');
const pg = require('pg');
const db = new pg.Client();
const category = new Category({
    name: "development"
});

describe('dbCategoryTest', () => {
    before(()=>{
        db.connect();
    });
    describe('insert query', () => {
        before((done) => {            
            db.query(`
            DROP TABLE IF EXISTS category;
            CREATE TABLE public.category (
                id SERIAL,
                name character varying
            );`, (err) => {
                assert(err == null);
                done();
            })
        });
        it('should insert new Category to database', (done) => {         
            category.save(db, (err, id) => {
                assert(err == null);
                assert(id > 0);
                done();
            });
        });
        it('should return existing Category from database', (done) => {
            Category.getById(db, 1, (err, item) => {
                assert(err == null);
                assert(category != null);
                assert(category.id == 1);
                assert(category.name == 'development');
                done();
            })
        });
        it('should update existing Category in database', (done) => {
            category.name = 'shopping';
            category.update(db, (err) => {
                assert(err == null);
                Category.getById(db, 1, (err, updatedCategory) => {
                    assert(err == null);
                    assert(updatedCategory.name == 'shopping');
                    done();
                });
            });
        });
        it('should update non-existing Category in database', (done) => {
            const newCategory = new Category({
                name: 'development'
            });
            newCategory.update(db, (err, id) => {
                assert(err == null);
                assert(id == 2);
                done();
            });
        });
        it('should delete Category from database', (done) => {
            Category.deleteById(db, 1, (err) => {
                assert(err == null);
                Category.getById(db, 1, (err, category) => {
                    assert(err == null);
                    assert(category == null);
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