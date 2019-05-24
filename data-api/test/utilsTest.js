const Utils = require('../utils/utils');
const assert = require('assert');

describe('utils', () => {
    describe('format date', () => {
        it('should convert datetime to YYYY-MM-DD HH-MM-SS string', () => {
            const datetime = new Date(2019, 11, 12, 21, 21, 21);
            const formatted = Utils.formatDateTime(datetime);
            assert(formatted == '2019-11-12 21:21:21');
        });
        it('should convert datetime with month < 10 with leading zero', () => {
            const datetime = new Date(2019, 9, 12, 21, 21, 21);
            const formatted = Utils.formatDateTime(datetime);
            assert(formatted == '2019-09-12 21:21:21');
        });
        it('should convert datetime with day < 10 with leading zero', () => {
            const datetime = new Date(2019, 10, 9, 21, 21, 21);
            const formatted = Utils.formatDateTime(datetime);
            assert(formatted == '2019-10-09 21:21:21');
        });
        it('should convert datetime with minute < 10 with leading zero', () => {
            const datetime = new Date(2019, 10, 10, 21, 0, 21);
            const formatted = Utils.formatDateTime(datetime);
            assert(formatted == '2019-10-10 21:00:21');
        });
        it('should convert datetime with seconds < 10 with leading zero', () => {
            const datetime = new Date(2019, 10, 10, 21, 21, 3);
            const formatted = Utils.formatDateTime(datetime);
            assert(formatted == '2019-10-10 21:21:03');
        });
    });
});