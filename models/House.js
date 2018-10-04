
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        province: {type: String, required: true},
        postalCode: {type: String, required: true}
    }
    // address: {type: String, required: true}
})

const House = mongoose.model('House', houseSchema);
module.exports = House;