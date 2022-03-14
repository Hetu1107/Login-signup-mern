const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"please provide username"]
    },
    email : {
        type : String,
        required : [true,"please provide email"],
        unique : true,
        // match : ['[a-z0-9]+@[a-z]+\.[a-z]{2,3}',"please provide valid email"]
    },
    password : {
        type : String,
        required : [true,"please add a password"],
        minlength : 6,
        select : false
        // select is that whenever we asked for use we dont want password we will seperately tell query for that 
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
});

UserSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}
UserSchema.methods.getSignedToken = function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES});
}
const user = mongoose.model("user",UserSchema);
module.exports = user;