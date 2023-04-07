// import mongoose from 'mongoose'

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost/crud')
//         console.log('db connection succesful')
//     } catch (error) {
//         console.log(error)
//     }
// }


const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/crud")
.then(() => { 
    console.log("mongodb connected")
})
.catch(() => {
    console.log("failed")
})