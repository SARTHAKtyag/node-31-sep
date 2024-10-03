const express=require('express');
const { default: mongoose } = require('mongoose');

async function connetion() {
    try{
await mongoose.connect('mongodb://localhost:27017/batch3-30-sep');
console.log("Data has been connected successfully...")
    }catch(err){

    }
}
module.exports=connetion;