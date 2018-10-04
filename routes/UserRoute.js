const express = require('express');
const router = express.Router();
const User = require('../models/User');

/*
    we have a function called 
    function checkandSendReminders(){
        //everyday you need to check and send out reminders 
        //check for all expenses that have a due date between 0:00 December 28 and 23:59:59 Dec28 and send emails 
    
        //example: dec 26,
        //we are going to check for expenses with due date on the 28th

        //look at the expenses thats due three days from now 
        

        //pseudocode:
        //this function will run every day
        //get today's date,
        //add 3 days  (use moment) 
        //get start_of_that day and end_of_day 
        //get all expenses with due date between start_of_day and end_of_day 
        //send emails for all those expenses 

        Expense.find({
            start_date: {
                $gt: start_of_Day,
                $lt: end_of_day
            })
            .then(...) 
        })
    }

*/

// // node agenda
// const mongoConnectionString = 'mongodb://127.0.0.1/divvy';
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'divvy'}});

// agenda.define('send email report', (job, done) => {
//   const {to} = job.attrs.data;
//   User.send({
//     to,
//     from: 'example@example.com',
//     subject: 'Monthly Expense Report',
//     body: '...'
//   }, done);
// });

// (async function() {
//   const monthlyReport = agenda.create('send email report', {to: `${User.email}`});
//   await agenda.start();
//   await monthlyReport.repeatEvery('1 month').save();
// })();

// get request for all expenses
router.get('/', (req,res) => {
    User.find({})
    .then(user => {res.json(user);})
    .catch(err => {res.status(500).send(err)});
})

// post request to add a new expense
router.post('/new', (req,res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        house_id: req.body.house_id
    })
    newUser.save()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).send(err);
    });
})

module.exports = router;