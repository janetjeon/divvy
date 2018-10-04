const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/divvy');
const db = mongoose.connection;
db.on('open', () => {console.log('mongoose connected!')});
const User = require('../models/User');
const House = require('../models/House');

// sample house
const sampleHouse = {
    address: {
        street: "21 Jump Street",
        city: "Toronto",
        province: "Ontario",
        postalCode: "M3V 1G1"
    }
}

// sample users
let sampleUsers = [
    {
        name: {
            firstName: "Janet",
            lastName: "Jeon"
        },
        email: "janetjeon9@gmail.com",
        house_id: null
    },
    {
        name: {
            firstName: "May",
            lastName: "Cai"
        },
        email: "maycai@gmail.com",
        house_id: null
    },
    {
        name: {
            firstName: "Nakisa",
            lastName: "Naderkhamseh"
        },
        email: "nakisanaderkhamseh@gmail.com",
        house_id: null
    }
]

// create the house and get back the saved version
// use the id of the house that was generated for the 'house_id'
// field of the test users

// delete all the houses for a fresh start
House.deleteMany({})
.then(result => {
    // delete all the users for a fresh start
    return User.deleteMany({})
})
.then(result => {
    const house = new House(sampleHouse)
    return house.save()
})

.then(savedHouse => {
    const house_id = savedHouse._id;
    console.log(house_id)
    sampleUsers = sampleUsers.map((user) => {
        return {...user, house_id: house_id}
    });
    return User.create(sampleUsers)
})
.then(savedUsers => {
    console.log(savedUsers);
})
.catch(err => {
    console.log(err);
})


// // sample expenses
// const sampleExpense = {
//     nameOfExpense: "Rent",
//     description: "Rent for September 2018",
//     amount: "$1000",
//     payer: "Janet Jeon",
//     ower: "May and Nakisa",
//     cannotWait: true,
//     houseId: {type: Schema.Types.ObjectId},
//     createdAt: {type: Date, default: Date.now},
//     updatedAt: {type: Date, default: Date.now}
// }