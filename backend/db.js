const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "123456",
    database: "db_tasks"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Conectado ao banco de dados MySql !");
});

module.exports = connection;