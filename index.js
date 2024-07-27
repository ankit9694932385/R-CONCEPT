const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.set("view engine" , "ejs");
app.set(path.join(__dirname , "/views")); 


app.use(express.static("public"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true})); 
app.use(methodOverride('_method'));     


app.listen(port , () => {
    console.log(`port is listening on ${port}......`);
});

let posts = [
    {
        id : "1a",
        username : "Ankit kumawat",
        tweet : "this is my first day on twitter"
    },

    {
        id : "2b",
        username : "Henna kumawat",
        tweet : "i love the way you teaching"
    },

    {
        id : "3c" ,
        username : "Renu kumawat",
        tweet : "i love listening podcast"
    }
];


app.get("/" , (req , res) => {
    res.send("SERVER WORKING WELL");
});

app.get("/tweets" , (req , res) => {
    res.render("alltweet.ejs" , {posts})
});

app.get( "/tweets/new" , (req  , res) => {
    res.render("newtweet.ejs");
});

app.post("/tweets" , (req , res) => {
  let {username , tweet } = req.body ;
  id = uuidv4();
  posts.push({id , username , tweet});
  res.redirect("/tweets")
});


app.get("/tweets/:id" , (req , res) => {
    let {id} = req.params
    let tweet = posts.find( p => id === p.id)
    console.log(tweet);
    res.render("detail.ejs" , {tweet})
});


app.patch( "/tweets/:id" , (req , res) => {
    let {id} = req.params
    let newtweet = req.body.tweet
    let post = posts.find( p => id === p.id)
    post.tweet = newtweet;
    res.redirect("/tweets")
});

app.get("/tweets/:id/edit" , (req , res) => {
    let {id} = req.params;
    let post = posts.find( p => id === p.id)
    res.render("edittweet.ejs" , {post});
});

app.delete( "/tweets/:id" , (req , res) => {
    let {id} = req.params
    posts = posts.filter( p => id !== p.id)
    res.redirect("/tweets")
});
