const express = require('express'); // requiring express
const app     = express();
const cors    = require('cors');
require('dotenv').config();
const PORT    = process.env.PORT || 8080; 
const moment  = require('moment');
const Expense = require('./models/Expense');
const sgMail  = require('@sendgrid/mail');




// node agenda stuff = CURRENTLY IN PROGRESS 
const Agenda = require('agenda');
const mongoConnectionString = 'mongodb://127.0.0.1:27017/agenda';
const agenda = new Agenda({db: {address: mongoConnectionString}});

const tonight = moment().endOf('day').toDate();
const now = moment().startOf('day').toDate();

Expense.find({
  dueDate: {
    $lt: tonight,
    $gte: now
  }
})
.then(expenses => {
  console.log(expenses);
})
// this is to test to see if node agenda is working 
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'janetjeon@hotmail.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

// mongoose
const mongoose = require('mongoose'); // requiring mongoose
mongoose.connect('mongodb://localhost:27017/divvy');
const db = mongoose.connection; 


// function dueDateReminder(job, done){
//   // STEP 1: FIND ALL EXPENSES
//   // let today = moment();
//   // let newDate = moment().add(7, 'days');
//   let newDate = moment();

//   let start_of_day = newDate.startOf('day').toDate();
//   console.log('start of day',start_of_day)
//   let end_of_day = newDate.endOf('day').toDate();
//   console.log('end of day',end_of_day)



//   Expense.find({
//     dueDate: {
//       $gt: start_of_day,
//       $lt: end_of_day
//     }})
//     .populate('payer')
//     .populate('owers')
//     .then(expenses => {
//       // STEP 2: SEND REMINDER EMAILS FOR ALL THOSE EXPENSES
//       // for each expense, loop over each ower and do the send reminder emails 
//       expenses.forEach(owers => {
//         let email = owers.map(ower => {
//           console.log('ower email is: ', ower.email)
//           return ower.email
//         })
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//           to: email,
//           from: 'divvy@example.com',
//           subject: 'You have an upcoming bill to pay!',
//           text: "We've collected your upcoming bills due in 1 week. Please go to DIVVY to check.",
//           html: '<strong>DIVVY</strong>',
//         };
//         sgMail.send(msg);
//       })
//     })
//     .catch(err => {
//       res.status(500).send(err)
//     });
//     // STEP 3: CALL DONE()
//   done();
// }

// agenda.start();
// agenda.on('ready', () => {
//     agenda.define('send reminders', dueDateReminder)
//     agenda.every('30 seconds', 'send reminders');
//     // agenda.define('send monthly reminder', monthlyReminder)
//     // agenda.every('1 month', 'send monthly reminder');
// })



// router
const expenseRouter  = require('./routes/ExpenseRoute');
const userRouter = require('./routes/UserRoute');


app.use(express.static('./client/build')); 
app.use(express.json()); //if someone sends json in post body, this middleware fn will read it and turn it into the right thing
app.use(express.urlencoded({extended: false})); //we told the express server to listen to urlencoded so we have to use this when using postman
app.use(cors()); //this sets it up so our server has that access-control-allow-origin

app.use('/api/expenses', expenseRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {console.log(`listening on ${PORT}...`);})
db.on('open', () => {console.log('mongoose connected!')});


















// .then(expenses => {
//   // STEP 2: SEND REMINDER EMAILS FOR ALL THOSE EXPENSES
//   // for each expense, loop over each ower and do the send reminder emails 
//   expenses.forEach(owers => {
//     owers.map(ower => {
//       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//       const msg = {
//         to: ower.email,
//         from: 'divvy@example.com',
//         subject: 'You have an upcoming bill to pay!',
//         text: "We've collected your upcoming bills due in 1 week. Please go to DIVVY to check.",
//         html: '<strong>DIVVY</strong>',
//       };
//       sgMail.send(msg);
//     })
//   })
// })



// function monthlyReminder(job, done){
//   // let date = moment();
//   let end_of_month = moment().endOf('month');
//   console.log('end of day',end_of_month)

//   Expense.find({
//     dueDate: null
//     })
//     .then(expenses => {res.json(expenses)})
//     .catch(err => {res.status(500).send(err)})

//   done();
// }
