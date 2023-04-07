const jwt = require("jsonwebtoken")
require("dotenv").config();


const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let decodeData;
        if(token){
            decodeData = jwt.verify(token, process.env.SECRET_TOKEN)
            req.userId = decodeData?.id
        }else{
            decodeData = jwt.decode(token)
            req.userId = decodeData?.sub
        }
 
        return next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;