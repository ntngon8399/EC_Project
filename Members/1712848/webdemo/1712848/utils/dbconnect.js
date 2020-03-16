const mysql = require('mysql');

function createCon(){
	return mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "WEBDEMO"
	});
}

module.exports = {
	load: (query) =>{
		return new Promise((resole,reject)=>{
			const con = createCon();
			
			con.connect(err => {
				if (err) {
					reject(err);
				}
			});

			con.query(query,(error,results,fields) =>{
				if (error) {
					reject(error);
				}
				resole(results);
			});

			con.end();
		});
	}
};