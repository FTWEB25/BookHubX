const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    title:String,
    genre:String,
    author:String,
    description:String,
    img:String,
    price:Number,
    author_ID:String
})

const BookModel=mongoose.model("book",bookSchema)

module.exports=BookModel