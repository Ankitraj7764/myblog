
const express=require('express');
var v= require('lodash');
const path= require('path')
const mongoose=require('mongoose');
const PORT=process.env.PORT || 3000;
mongoose.connect("mongodb+srv://signinsignup:Sign@cluster0.y87x56b.mongodb.net/?retryWrites=true&w=majority",  () => {
    console.log("Connected to MongoDB");
  })
const app=express();
mongoose.set('strictQuery', true);
const bodyparser=require('body-parser');
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use(bodyparser.urlencoded({extended:true}));
// app.use('/.netlify/fuctions/app',app)

const contactSchma=new mongoose.Schema({
    name:String,
    email:String,
    message:String
});
const ContactModal=mongoose.model("contactdata",contactSchma);
const blogSchma=new mongoose.Schema({
    title:String,
    datablog:String
});
const blogModel=mongoose.model("blogData",blogSchma);


app.set('view engine','ejs');

const a="home page";
app.get('/',(req,res)=>{
    blogModel.find({},function(err,posts){
        
        res.render("home",{a:a,posts:posts});
    })
   
    
})
const abt="about your website"
app.get("/about",(req,res)=>{
    res.render("about",{abt});
})
const cnt="about your website"
app.get("/contact",(req,res)=>{
    res.render("contact",{cnt});
})
app.get("/compose",(req,res)=>{
    res.render("compose")
})


app.post("/compose",(req,res)=>{
  
  var post={
    tittle1:req.body.tittle,
    postdata1:req.body.postdata,
  
  }
  const a=new blogModel({
    title:req.body.tittle,
    datablog:req.body.postdata
  })
  a.save();
  
   res.redirect("/")
})
app.get('/:abc',(req,res)=>{
    blogModel.find({},function(err,posts){
        
       
        for(let i=0;i<posts.length;i++){
             if(v.lowerCase(posts[i].title)===v.lowerCase(req.params.abc)){
                 res.render("page",{a:posts[i]})
             }
            
         }
    })
})
app.get("pos/notfound",(req,res)=>{
    res.redirect('/compose')
})
app.post('/delete',(req,res)=>{
    const id=req.body.data;
    console.log(id)
  blogModel.findByIdAndRemove(id,function(err){
    if(!err){
        console.log("deleted")
    }
    res.redirect("/")
  })
  
})
app.post('/contact',(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.message;
    const data= new ContactModal({
        name:name,
        email:email,
        message:message

    })
    data.save();
    res.redirect("/contact")

})

app.listen(PORT,function(){
    console.log("connected")
})

// module.exports.handler=serverless(app)