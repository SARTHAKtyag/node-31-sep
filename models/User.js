const mongoose=require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema =mongoose.Schema;

const UserSchema= new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    confirmpassword:{type:String},
    mobileNo: { type: String },
    profileImage:{ type: String},//string datatype lenge kyunki yha hum url paste karte h image nhi
    createdAt: Date,
    updatedAt: Date
})
UserSchema.plugin(timestamps,{index: true});

module.exports=mongoose.model('user',UserSchema)
