var mysql = require("mysql");

var connection = mysql.createConnection(
    {  
        host: "localhost",  
        database: "welcomepartymanagementsystem",                         
        user: "root",  
        password: "", 
    }); 


module.exports = connection;