const mongoose = require('mongoose');

const MadicineSchema = mongoose.Schema({
    name : {type : String , default : ''},
    mg : {type : String , default : ''},
    manufacturer : {type : String , default : ''},
    description : {type : String , default : ''}
});

module.exports = mongoose.model('madicine' , MadicineSchema);