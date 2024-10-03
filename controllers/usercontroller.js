const bcrypt=require('bcrypt');
const cloudinary=require("cloudinary").v2;
const User=require('../models/User');
const saltRounds=10;
async function signUp(req,res) {
    try{
        console.log(req.body);//text data in req.body
        console.log("**************");
        console.log(req.file);//files data 
        cloudinary.config({
            cloud_name:"dmc5m9bin",
            api_key:"841425856549799",
            api_secret:"hdlv5HCtDw1KaW1xbsbAXP5jowQ"
        });
        const result=await cloudinary.uploader.upload(req.file.path);
        console.log(result,"result")
        res.end("<h1>file submission is in process</h1>")
       // console.log(req.body,'req.body');
       let password=bcrypt.hashSync(req.body.password,saltRounds);
       // console.log(password,"password")
        let user= new User(req.body);
        user.password=password;
        user.profileImage=result.secure_url;
        await user.save();
       // res.redirect('/');
res.end("<h1>sign up successfully</h1>")
    }catch(err){
console.log(err.message,"msg");
    }
}
async function doLogin(req,res){
    try{
console.log(req.body,'req.body')
let user=await User.findOne({email: req.body.email });
if(!User){
    res.end("<h1>no such user exist</h1>")
}else{
    let isMatch=await bcrypt.compare(req.body.password,user.password);
   // console.log(isMatch,'isMatch')
    if(isMatch){
        res.end("<h1>login successfully");
    }else{
        res.end("<h1>Incorrect password</h1>")
    }
}

    }catch(err){

    }
}
async function getUsers(req,res){
    try{
let users=await User.find({});
console.log(users);
//res.send(users)
res.render('userlist',{
    users: users
})

    }catch(err){
console.log(err.message,"msg");
    }
}
module.exports={
    signUp,
    doLogin,
    getUsers
}