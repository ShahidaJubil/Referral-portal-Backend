const mongoose =require('mongoose')

const ImageSchema=new mongoose.Schema({
    fname: {
        type:String,
        default:"none"
    },
    lname: {
        type:String,
        default:"none"
    },
    email: {
        type:String,
        default:"none"
    },
    location: {
        type:String,
        default:"none"
    },
    phone: {
        type:String,
        default:"none"
    },
    imageData:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Profile", ImageSchema);