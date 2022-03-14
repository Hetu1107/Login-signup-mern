const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user,201,res);
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res, next) => {
  const {email,password} = req.body;
  if(!email || !password){
    return next(new ErrorResponse("please provide email and password",400));
  }
  try{
    const user = await User.findOne({ email : email }).select("password");
    if(!user){
      return next(new ErrorResponse("invalid credentials",404));
    }
    const isMatch = await user.matchPasswords(password);
    if(!isMatch){
      return next(new ErrorResponse("invalid credentials",404));
    }
    sendToken(user,200,res);
  }catch(e){
    next(e);
  }
};
exports.forgotpassword = (req, res, next) => {
  res.send("forget Route");
};
exports.resetpassword = (req, res, next) => {
  res.send("reset password Route");
};


const sendToken = (user,statusCode,res)=>{
  const token = user.getSignedToken();
  res.status(statusCode).json({success : true, token});
}