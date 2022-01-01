const express = require('express')
const app = express()
const port = 5000
const mongoose=require("mongoose");
app.use(express.json())

mongoose
.connect("mongodb://localhost:27017/user")
.then(()=> console.log("mogodb connect"))

const userModel=require("./Models/userModel")

app.get('/', (req, res) => res.send('Hello World!'))
//login
app.post('/api/userlogin',async(req,res)=>{
    const  username= req.body.name;
    const password=req.body.password;
    const userlist = await userModel.find({name:username,password:password})

    if(userlist.length === 1){
        return res.json({msg:"login",code:200,user:userlist[0]})
    }
    return res.json({msg:"login failed",code:404})
})

//list user
app.get('/api/listuser',async(req,res)=>{
    const userlist= await userModel.find({});
    if(userlist.length ===0){
        return  res.json({data: "no user  "})
    }
    return res.json({data:userlist})
});
//search other user
app.post('/api/searchuser',async(req,res)=>{
    const userage= req.body.age;
    const userlist = await userModel.find({age:userage})
    if(userlist.length === 0){
        
        return res.json({data:"no user",code:404})

    }
    console.log(userlist)
    return res.json({users:userlist,code:200})
})
//register user
app.post('/api/registeruser',async(req,res) => {
    const  user= req.body;
    const adduser= await userModel.create(user);
    return  res.json({msg:"register succeessfully....",code:200})
});

//update user
app.put('/api/updateuser',async(req,res)=>{
    const userid= req.body.id;
    const username=req.body.name;
    const password=req.body.password;
    const age =req.body.age;
    const hobby= req.body.hobby;
    const profile=req.body.profile;

    const updateuser=await userModel.findOneAndUpdate(
        {id:userid},
        {name:username,
            password:password,
            age:age,
            hobby:hobby,
            profile:profile
        },
        {new:true}
    );
    console.log(updateuser)
    return  res.json({msg:"User update Successfully",code:200,user:updateuser})
});

//delete user
app.post('/api/userdelete',async(req,res)=>{
    const userid= req.body.id;
    console.log(req.body)
    const deleteuser= await userModel.findOneAndDelete({id:userid});
    console.log(deleteuser)

    return res.json({msg:"delete successfully",code:200})

    if(deleteuser.length === 1){
        return res.json({msg:"delete successfully",code:200})
    }else{
        return res.json({msg:"User not Found",code:404})

    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
