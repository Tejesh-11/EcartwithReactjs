//create express app
const exp=require('express')
const app=exp();
const path=require('path')
//join with react
app.use(exp.static(path.join(__dirname,'../client/build')))
//configure environment variables
require('dotenv').config()
//add body parsing middleware
app.use(exp.json())

//import api
const userApp=require('./APIs/user-api');
const sellerApp=require('./APIs/seller-api');
const productApp=require('./APIs/product-api');


//forward req to userApp when path starts with '/user-api'
app.use('/user-api',userApp)
app.use('/seller-api',sellerApp)
app.use('/product-api',productApp)

app.use((req,res,next)=>
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
)


//error handler
app.use((err,req,res,next)=>{
    res.send({message:"error occuurred",payload:err.message})
})

//asign port number
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`web server listening on port ${PORT}`))