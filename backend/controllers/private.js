const { default: mongoose } = require("mongoose")
const user = require("../models/User")

exports.getPrivateData = (req,res,next)=>{
    const User = user.findById({})
    res.status(200).json({
        sucess : true,
        data : req.user
    })
}