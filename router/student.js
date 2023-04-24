const express=require('express');
const router=express.Router();
const Student =require("../model/student");
const multer = require("multer");

const path = require("path");
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage })
router.get("/",async (req,res)=>{
   // res.send("hello");
   try{
    const play = await Student.find();
    res.send(play);
    console.log(play); 

   }catch(err){
res.send(err);
   }
})
router.get("/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const play = await Student.findById(_id);
        console.log(play);
        res.send(play);
    }catch(err){
        console.log(err)

    }
})
/*router.post("/students",(req,res)=>{
    const user=new Student(req.body);
    console.log(user);
    user.save().then(()=>{
        res.send(user);
    }).catch((er)=>{
        res.send(er);
    })*/
    
    

router.post('/students',upload.array('productPictures'),async (req,res)=>{
    const { name, email, phone, address } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Student({
    name: name,
   email,
    phone,
   address,
    productPictures,
  });

product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
});


router.put('/:id',async (req,res)=>{
  
try{ 
    const _id=req.params.id;

  const play=await Student.findByIdAndUpdate(_id,req.body,{new:true})
  res.send(play);
   console.log(play);
   
}catch(err){
    console.log(err);
}
})
router.delete('/:id',async (req,res)=>{
     try{
        const _id=req.params.id;
        const play=await Student.findByIdAndDelete(_id,req.body)
        res.send("deleted");
    console.log("deleted");
     }catch(err){
        console.log(err);
     }
})
module.exports=router;