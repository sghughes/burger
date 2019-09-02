var connection = require('../config/connection');

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  }
  
  // Converts object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      //skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // convert array of strings to a single string separated by commas
    return arr.toString();
  }

  
var orm = {
    selectAll: function(tableInput, burg) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        burg(result);
      });
    },
    insertOne: function(table, cols, vals, burg) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        burg(result);
      });
    },

    updateOne: function(table, objColVals, condition, burg) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        burg(result);
      });
    }
  };
  

module.exports = orm;
