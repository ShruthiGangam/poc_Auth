const jwt= require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    let token;
    let authHeader= req.header.Authorization|| req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"no token, authorization denied"})
    }   

    try{
        //the user here jsone fiel of user bit confused here as in case of patitert should it be patient
        const decode= jwt.verify(token,process.env.TOKEN)
        req.user=decode;
        console.log("the decoded user",req.user)
        next()

    }catch(err){
        res.status(400).json({message:"token is invalid"})
    }
}
    else{
        return res.status(401).json({message:"no token, authorization denied"})
    }
}

export {verifyToken}