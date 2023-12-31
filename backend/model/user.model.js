const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user",
        enum: ["user", "author", "admin"]
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports=UserModel