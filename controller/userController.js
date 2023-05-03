const userDetails = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

exports.createUser = async (req,res) =>{

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)
        req.body.password = hash
       
        const user = await new userDetails(req.body)

            user.save().then(()=>{
                res.json({message:'User created',user})
            }).catch(()=>{
                res.json({message:'User not created'})
            })
      
        
    }catch(error){
        res.status(500).json({message:'something went wrong'})
    }
    

}


exports.loginUser = async(req,res) =>{
    try{
        const findUser = await userDetails.findOne({userName:req.body.userName})
        console.log('userName',findUser)
        if(findUser){
            const token = jwt.sign({_id:findUser._id,user:process.env.USER},process.env.JWT_SECRET,{expiresIn:'1d'})
           
            if(token){
                const compare = await bcrypt.compare(req.body.password,findUser.password)
                console.log('compare',compare)

                if(compare){
                    res.status(200).json({message:"success",token})
                }else{
                    res.status(403).json({message:'username and password is incorrect" '})
                }

            }else{
                res.status(404).json({message:'Token is not found'})
            }

        }else{
            res.status(404).json({message:"User is not found"})
        }

    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
}