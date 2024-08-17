const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authenticate=require('../middleware/authenticate');



require('../db/conn');
const User=require('../model/userSchema');
//router.use(require("cookie-parser"));

let tempList;

router.get("/",(req,res)=>{
  res.send("Yess!!! Server is running")
});

router.post("/register",async(req,res)=>{
    const {name,email,password,cpassword,phone,address}=req.body;
    
    if(!name || !email || !phone || !address || !password|| !cpassword){
      return res.status(400).json({error: "Please fill the data properly"});
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({error: "Email already exists"});
         }else if(password!=cpassword){
            return res.status(400).json({ error:"Passwords do not match"})
          }
          else{
            const user = new User({name,email,password,cpassword,phone,address});
             
            const userRegister=await user.save();
          if(userRegister){            
            res.status(200).json({message:"Registration Successful"})
          }else{
            return res.status(400).json({error: "Failed to register"})
        }
          }
     } catch(err){
        console.log(err);
     }
});

router.post("/signin",async(req,res)=>{
  try{
    const {email,password}=req.body;
       //console.log(`Data posted: ${email} and ${password}`);

    if(!email || !password){
        return res.status(400).json({ error:"Please enter data"});
    }
    //userLogin will be the document with whom email matches
    const userLogin=await User.findOne({email:email});

    //if user exists
    if(userLogin){
     //trying to compare the passwords
     const isMatch=await bcrypt.compare(password,userLogin.password);
     //(password==userLogin.password)
     //console.log(`isMatch= ${isMatch}`);
    
     //creating a token
    const token=await userLogin.generateAuthToken();

    if(!isMatch){
      return res.status(400).json({ error:"Invalid Credentials"})
    }
    else{
    //storing token in a cookie
    //res.cookie(name,values)
    res.cookie("jwtoken",token,{
      //will expire in 30 days (coverted to millisecond)
      expires:new Date(Date.now()+25892000000)
    });

    return res.status(200).json({message:"Login Succesful"})
    }
    }
    //if user does not exist
    else{
      return res.status(400).json({ error:"User not registered"})
    }
    
  }catch(err){
      console.log(err);
  } 
})

router.get("/about",authenticate,(req,res)=>{
  res.send(req.rootUser);
});

//to get grievances
router.get("/getdata",authenticate,(req,res)=>{
  res.send(req.rootUser);
})

//to post grievance
router.post("/grievance",authenticate,async(req,res)=>{
    try{
       const {name,email,phone,dept,grievance}=req.body;

       if(!name || !email || !phone || !grievance) {
          console.log("Empty data in grievance portal");
          return res.status(400).json({error:"Please fill all the details"});
       }
       const userContact=await User.findOne({_id: req.userID});
       if(userContact){
          const userMsg=await userContact.addGrievance(name,email,phone,dept,grievance);
          await userContact.save();
          
          return res.status(200).json({message:"Grievance Filed Successfully"});
        }
    }catch(err){
      console.log(err);
    }
})

//grievances list
router.get("/grievancelist",async(req,res)=>{
  try{
    //db.users.find({},{grievances:1}).pretty()
    const grievanceList=await User.find({grievances:{ "$not": { "$size": 0 } }},{grievances:1});
    tempList=grievanceList;

    if(!grievanceList){
      return res.status(400).send();
    }
    else{
      res.status(200).send(grievanceList);
    }
  }catch(err){
    console.log(err);
  }
})

router.get("/education",async(req,res)=>{
  try{
    //db.users.find({},{grievances:1}).pretty()
    const grievanceList=await User.find({grievances:{ "$not": { "$size": 0 } }},{grievances:1});
    tempList=grievanceList;

    if(!grievanceList){
      return res.status(400).send();
    }
    else{
      res.status(200).send(grievanceList);
    }
  }catch(err){
    console.log(err);
  }
})



//admin functionalities --> just a try
router.get("/users/:name",async(req,res)=>{
  try{
     const myname=req.params.name;
     const userData=await User.find({name:myname});

     if(!userData){
         return res.status(400).send();
     }
     else{
     res.status(200).send(userData);
     }
  }catch(err){
      res.status(400).send(err);
  }
})

//user update --> just a try
router.patch("/users/:id", async (req,res)=>{
  try{
    const _id = req.params.id;
    //use findOneAndUpdate({name:_id},req.body) for updating via name
    const updateUsers = await User.findByIdAndUpdate(_id,req.body,{
        new: true
    });
    res.status(200).send(updateUsers);
  }catch(err){
     res.status(400).send(err);
  }
})

//grievance update
router.post("/aAbBcC/updatedocs",async(req,res)=>{
  try{ 
    console.log(req.body);
    const {email,dept,_id,gId,status,feedback}=req.body;
    
    if(!email || !dept || !_id || !gId || !status || !feedback){
      res.status(400).json({message:"Please send data"});
    }
    
    const doc=await User.updateOne({_id},
      {$set:{'grievances.$[g].status': status,'grievances.$[g].feedback': feedback}},
      {arrayFilters: [{'g._id': gId}] });
      
      console.log(email);
      console.log("Grievance Updated Successfully");
    return res.status(200).json({messgae:"Message updated"});
  }catch(err){
    return res.status(400).json({error:"Could not update"});
  }
});

//logout page
router.get("/logout",(req,res)=>{ 
  res.clearCookie('jwtoken',{path: "/"});
  res.status(200).send("Logout Successful");
});

module.exports=router;