var orm = require('../config/orm');


var burger = {
    selectAll: function(burg) {
        orm.selectAll('burgers', function(res){
            burg(res);
        })
    },
    insertOne: function(cols,vals,burg) {
        orm.insertOne('burgers', cols,vals,function(res){
            burg(res);
        })
    },
    updateOne: function(objColVals, condition, burg){
        orm.updateOne('burgers', objColVals, condition, function(res){
            burg(res);
        })
    }
 };

 module.exports = burger;

