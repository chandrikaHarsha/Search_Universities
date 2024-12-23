const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Chandrika98*",
  database: "favorite_University_List",
});

module.exports = connection.promise();
