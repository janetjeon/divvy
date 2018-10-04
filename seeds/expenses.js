const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/divvy');
const db = mongoose.connection;
db.on('open', () => {console.log('mongoose connected!')});
const Expense = require('../models/Expense');
const User = require('../models/User');

const expenseSchema = {
    nameOfExpense: "Groceries",
    description: "August 22, 2018 groceries",
    amount: "76.50",
    payer: 'janet@gmailc',
    ower: "May Cai",
    cannotWait: false,
    house_id: null,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}
