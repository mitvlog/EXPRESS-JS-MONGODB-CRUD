const mongoose=require('mongoose');

const stu=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        
       
        
    },
    phone:{
        type:String,
        required:true,
       
    },
    address:{
        type:String,
        required:true,
       

    },
    productPictures: [
        { img: 
            { type:String } }
    ],
   

})
const Student=new mongoose.model("Student",stu);
module.exports=Student;