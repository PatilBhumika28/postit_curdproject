const express=require("express");
const app=express();
const methodOverride = require("method-override");


const {v4: uuidv4 }=require('uuid');




const path=require("path");
app.use(express.static("node_modules"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



let port =3000;

let posts=[
  { id:uuidv4(),
    username:"Bhumika",
    content:"heyy there i love coding"
  },
  {   id:uuidv4(),
    username:"Trisha",
    content:"hey there i am trisha"
  }
];

//index
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});


//new post
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res)=>{
  res.render("new1.ejs");
})

app.post("/posts",(req,res)=>{
   let {username,content} =req.body;
   let id=uuidv4();

   posts.push({id,username,content});
   res.redirect("/posts");
})


//show post
app.get("/posts/:id",(req,res)=>{
  let {id} =req.params;
  let post=posts.find((p)=>id===p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("dekna.ejs", { post });
});





//edit post

app.patch("/posts/:id",(req,res)=>{
    let {id }=req.params;
    let newContent = req.body.content;
    let post=posts.find((p)=>id===p.id);
        post.content=newContent;
    console.log(post);

   res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
        let {id }=req.params;
        let post=posts.find((p)=>id===p.id);
        res.render("editform.ejs",{post});

});





app.delete("/posts/:id",(req,res)=>{
     let {id }=req.params;
     posts=posts.filter((p)=>id!==p.id);
      res.redirect("/posts");
})


app.listen(port,(req,res)=>{
  console.log(`app is listening to the port${port}`);
})