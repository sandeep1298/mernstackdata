const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    dob:{
        type:Date,
        required:true
    },
    messages:[
        {
            name:{
                type:String,
                require:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                require:true
            },
            message:{
                type:String,
                required:true
            }  
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})


//we are hashing password
userSchema.pre('save', async function(next){
    console.log("hi");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
        this.confirmpassword =await bcrypt.hash(this.confirmpassword , 12);
    }
    next();
});

//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
    }catch(err){
        console.log(err);
    }
}
//store the message
userSchema.methods.addMessage = async function(name,email,phone,message){
try{
this.messages = this.messages.concat({name,email,phone,message});
await this.save();
return this.messages;
}catch(error){
    console.log(error)
}
}

//collection cretion
const Users = mongoose.model('USERS', userSchema);
module.exports = Users;
