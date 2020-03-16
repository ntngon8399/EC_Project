const db = require('../utils/dbconnect');

module.exports = {
    GetAllProductsByCategory: async (IDCategory) => {
        const sql = `select * from webdemo.final where MA_LOAI_HANG = '${IDCategory}'`;
        const rows = db.load(sql);
        return rows;
    },
    GetDetailProductByID: async (IDprod) => {
        const sql = `select * from webdemo.final where MA_SAN_PHAM = '${IDprod}'`;
        const rows = db.load(sql);
        return rows;
    }
}