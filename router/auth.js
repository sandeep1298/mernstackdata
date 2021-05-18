const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../models/userSchema");
router.get('/',(req,res)=>{
    res.send("ello idiya illa idene");
});
//using promises
// router.post('/register',async (req, res)=>{
//     const {name,email, phone, work, password,confirmpassword} = req.body;
//    if(!name || !email || !phone || !work || !password || !confirmpassword){
//        return res.status(422).json({error:"please fill out this field"})
//    }
//     // res.json({message:req.body});
//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"});
//         }
//         const user = new User({name,email, phone, work, password,confirmpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"});
//         }).catch((err)=> res.status(500).json({error:"failed registered"}));



//     }).catch(err =>{console.log(err);});
    
// });

//using async await
router.post('/register',async (req, res)=>{
    const {name,email, phone, work, password,confirmpassword,dob} = req.body;
   if(!name || !email || !phone || !work || !password || !confirmpassword || !dob){
       return res.status(422).json({error:"please fill out this field"})
   }
   try{
  const userExist = await User.findOne({email:email});
  if(userExist){
    return res.status(422).json({error:"Email already exist"});
}
const newuser = new User({name,email, phone, work, password,confirmpassword,dob});
//hashing password

 await newuser.save();
res.status(201).json({message:"user registered successfully"});

   }  catch(err){
    console.log(err);
   }
    // res.json({message:req.body});
  
    
});

//login route
router.post('/login',async(req, res)=>{
// console.log(req.body);
// res.json({message:"welcome"});
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"pls fill the data"})
        }
        const userlogin = await User.findOne({email:email});
        // console.log(userlogin);
        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);

            const token = await userlogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token , {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });
            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"});
            }else{
            res.json({message:"user signin successfully"});
            }
        }else{
            res.status(400).json({error:"Invalid email"});
        }
        
    }catch(err){
        console.log(err);
    }
    });

    //about us page
    router.get('/about', authenticate,(req,res)=>{
            console.log("about");
             res.send(req.rootuser);
    });
//for contact us page and home page
    router.get('/contact', authenticate,(req,res)=>{
        console.log("about");
             res.send(req.rootuser);
    });

    // contact us page
    router.post('/contactpost', authenticate, async(req,res)=>{
            try{
                const {name , email, phone, message} = req.body;
                if(!name || !email || !phone || !message){
                    
                    console.log("error in contact form");
                    
                    return res.json({error:"please fill the contact form"});
                }
                const userContact = await User.findOne({_id: req.userID});
                if(userContact){
                    const userMessage = await userContact.addMessage(name,email,phone,message);
                await userContact.save();
                res.status(201).json({message:"user contact successfully"})
                }


            }catch(error){
                console.log(error);
            }
    }); 

      //logout  page

      router.get('/logout', authenticate,(req,res)=>{
        console.log("logout page");
        res.clearCookie('jwtoken',{path:'/'})
         res.status(200).send('user logout');
});

module.exports = router;

