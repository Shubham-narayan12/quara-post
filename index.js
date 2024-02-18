const express = require("express");
const app = express();
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride = require("method-override");
const port=3000;

let values=[
    {
        id : uuidv4(),
        username:"Shubham Narayan",
        content:"Har Har Mahadev"

    },
    {
        id : uuidv4(),
        username:"manshi singh",
        content : "i love you shubham"
    },
    {
        id : uuidv4(),
        username:"dharam veer",
        content: "leetcode question krte rho."
    }
];

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));   //vvi => post se info nikalne k liye ye use hota hain.



app.listen(port,(req,res)=>{
    console.log("server is listening");
});

app.get("/",(req,res)=>{
    res.send("server is working");
});

app.get("/quara",(req,res)=>{
    res.render("quara.ejs", {values});
});

app.get("/quara/newPost",(req,res)=>{
    res.render("create new post.ejs")
});

app.post("/register",(req,res)=>{
    let id=uuidv4();
    let {username,content} = req.body;
    values.push({id,username,content});
    res.redirect("/quara");
});

//show deatil k liye route.
app.get("/quara/:id",(req,res)=>{
    let {id} = req.params;
    let user = values.find((p) => id ===p.id);
    res.render("show detail.ejs",{user});
});

//niche ka dono request patch k liye hain.
//phela get request jo edit wala form lake dega
//dusra patch request jo content edit krega or save kr dega

app.get("/quara/:id/edit",(req,res)=>{         //is route pe request bhejge
    let {id}=req.params;
    let user = values.find((p)=>id ===p.id);
    res.render("edit form.ejs",{user});
});

app.patch("/quara/:id",(req,res)=>{       // request aayigi iss route pe
    let {id} = req.params;
    let newContent = req.body.content;           
    let user = values.find((p)=> id === p.id);
    user.content = newContent;
    res.redirect("/quara");
}); 

app.delete("/quara/:id",(req,res)=>{
    let {id} = req.params;
    values=values.filter((p)=> id!==p.id);
    res.redirect("/quara");
})