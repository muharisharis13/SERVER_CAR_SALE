const jwt = require('jsonwebtoken')
const responseJson = require("./responseJson")
const jwt_key = process.env.JWT_KEY
const models = require("../3.models")



const  ModelUser = models.user
exports.checkToken = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, jwt_key)
    const {email} = decoded
    await ModelUser.findOne({
      where:{
        email: email
      }
    })
    .then(resultUser =>{
      if(resultUser){
        res.userData = decoded;

        next();
      }
      else{
        const errText = {
          message:"Authentication User Error !"
        }
        responseJson(res,errText,401)

      }
    })
  } catch (err) {
    const errText = {
      message:"Authentication Error !"
    }

    responseJson(res,errText,401)
  }
}

exports.createToken = (result) => {
  return jwt.sign(result, jwt_key)
}