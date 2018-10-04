const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
// const agenda = require('agenda');
 

// get request to get expense list
router.get('/', (req,res) => {
    Expense.find({})
    .then(expenses => {res.json(expenses);})
    .catch(err => {res.status(500).send(err)});
    // agenda.on(()=>{
    //     let monthlyReport = agenda.create('send email report', {to: 'janetjeon@hotmail.com'})
    //     // check every day,
    //     // find ones with a deadline and send email 3 days before
    //     // else, send at the end of the month 
    //     agenda.start();
    // })
})

// post request to add a new expense
router.post('/new', (req,res) => {
    const newExpense = new Expense({
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount,
        payer: req.body.payer,
        owers: req.body.owers,
        dueDate: req.body.dueDate,
        house_id: req.body.house_id
    })
    newExpense.save()
    .then(expense => {
        res.json(expense);
    })
    .catch(err => {
        res.status(500).send(err);
    });
})

router.get('/monthly/paid', (req,res) => {
    const id = req.query.id;
    Expense.find({payer: id})
    .then(payer => {
        res.json(payer);
    })
    .catch(err => {res.status(500).send(err)});
})

router.get('/monthly/owed', (req,res) => {
    const id = req.query.id;
    Expense.find({owers: id})
    .then(ower => {
        res.json(ower);
    })
    .catch(err => {res.status(500).send(err)});
})

// app.put('/api/expenses/:userId', (req,res) => {
// }
// take in userId
//take in expeneId
// mongoose update user by id, add expense id to user epxnese array
// })

// router.delete('/', (req,res) => {
//     Expense.findOneAndRemove({_id: req.params.id}, (err) => {
//         if(err) {
//             res.status(500).send(err)}
//         }
//         req.
//     })
// })

module.exports = router;