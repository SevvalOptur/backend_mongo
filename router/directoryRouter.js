const express = require('express')
const userModel = require("../model/userModel.js");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js')
const router = express.Router();


router.get('/contactGet/', auth, async (req,res) => {
    try {
        const id = req.userId;
        console.log(".....")
        const users = await userModel.find({_id:id})
        console.log(users)
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
});

router.put('/contactAdd/', async (req,res) => {
    try {
        const { contactName, contactEmail } = req.body;
        console.log(contactName, contactEmail)
        const id = jwt.verify(req.body.token, process.env.SECRET_TOKEN).id;
        console.log("ww",id)
        const user = await userModel.findById(id)
        console.log(user)
        let contact ={contact:[ contactName= contactName, contactEmail=contactEmail]}
        if(user){
            console.log("giriş")
            const userAdd = await userModel.findByIdAndUpdate(user.id,{contact});
            return res.status(201).json(userAdd);
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/contactUpdate/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const { userName, email, password } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, { userName, email, password }, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
});

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const { id } =req.params;
//         const deletedUser = await userModel.findByIdAndDelete(id);
//         return res.status(202).json(deletedUser);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// })
 


module.exports = router;
