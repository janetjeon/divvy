const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}    
    },
    email: {type: String},
    // payed_bills: {type: [Schema.Types.ObjectId]},
    // username: {type: String, required: true},
    house_id: {type: Schema.Types.ObjectId}
})

const User = mongoose.model('User', userSchema);
module.exports = User;