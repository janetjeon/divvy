
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description: {type: String, required: true},
    type: {type: String},
    amount: {type: Number, required: true},
    payer: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    owers: {type: [{ type: Schema.Types.ObjectId, ref: "User"}], required: true},
    dueDate: {type: String},
    house_id: {type: Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;