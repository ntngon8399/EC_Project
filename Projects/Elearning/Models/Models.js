const db = require('../Connection/dbconnect');
module.exports = {
    GetAllAuthors: async () => {
        const sql = `select * from elearning.authors` ;
        const rows = db.load(sql);
        return rows;
    }
}