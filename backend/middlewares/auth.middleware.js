const jwt =require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        try {
            const decoded = jwt.verify(token, 'shhhhh')
            if(decoded){
                const userId=decoded.userId
                const user=await UserModel.findOne({_id:userId})
                const role=user?.role
                req.role=role
                if(role==='author'){
                    req.body.author_ID=user._id
                }
                next()
            }else{
                res.status(200).json({msg:"not authorized"})
            }
        } catch (error) {
            res.status(400).json({msg:error.message})  
        }
    }else{
        res.status(200).json({msg:"Please Login First!!"})
    }
}


module.exports=auth