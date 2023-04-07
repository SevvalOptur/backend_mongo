const express = require('express')
const userModel = require("../model/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const router = express.Router();
require("dotenv").config();


router.get('/', async (req,res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
});

/****login****/
router.post('/login/', async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.send("Böyle bir kullanıcı bulunmamaktadır.")
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.send("Parolanoz yanlış.")
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {expiresIn:'1h'})
        res.status(200).json({
            status: "ok", 
            user,
            token
        })        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
/****************/
/***register****/
router.post('/register/', async (req,res) => {
    try {
        const {name, email, number, password} = req.body
        const user = await userModel.findOne({email});
        if(user){
            return res.send("Bu mail adresi kullanılmaktadır.")
        }
        if(number.length < 11){
            return res.send("Telefon numaranız eksik ya da yanlış tuşlanmış.")
        }
        if(password.length < 6 ){
            return res.send("Parolanız 6 karakterden küçük olamamalı.")
        }
        
        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = await userModel.create({name, email, number, password: passwordHash})
        const userToken = jwt.sign({id: newUser.id}, process.env.SECRET_TOKEN, {expiresIn:'1h'})
        
        res.status(201).json({
            status:"ok", 
            newUser,
            userToken
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
/****************/



module.exports = router;
