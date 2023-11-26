const express=require("express")
const auth = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")
const BookModel = require("../model/book.model")


const bookRouter=express.Router()

bookRouter.get("/getbooks",auth,authorize(['user','author','admin']),async(req,res)=>{
    try {
        const books= await BookModel.find()
        res.status(200).json({msg:books})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

// bookRouter.get("/getbooks/:id",auth,authorize(['author','admin']),async(req,res)=>{
//     const authorId=req.params.id
//     try {
//         const books=BookModel.find({author_ID:authorId})
//         res.status(200).json({msg:books})
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
// })

bookRouter.post("/addbook",auth,authorize(['author','admin']),async(req,res)=>{
    const payload=req.body
    try {
        const book= new BookModel(payload)
        await book.save()
        res.status(200).json({msg:"book added successfully!"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports=bookRouter