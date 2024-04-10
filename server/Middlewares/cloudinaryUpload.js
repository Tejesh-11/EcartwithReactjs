const cloudinary = require('cloudinary').v2;
const multer=require('multer');
require('dotenv').config()

const fs=require("fs")

//creating uploads folder if not already present
//in "uploads" folder we will temporarily upload
//image before uploadingto clodinary

if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}

//cloudinary config
cloudinary.config({
    cloud_name:'divopfyqi',
    api_key:766241148445718,
    api_secret:'5yg8KVNkyrkMB3-bBO3Xe2MmpnY'
})

//multer config
const localstorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({storage:localstorage});
module.exports={upload,cloudinary};