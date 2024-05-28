let express = require("express");
let app = express();
let path = require("path");
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"));

app.listen(8080,()=>{
  console.log("server connected");
})

// app.get("/register",(req,res)=>{
// res.send("Standard GET response")
// })

let posts = [
   {
    id: uuidv4(),
    username:"Google",
    content:"A top Tech FANG Company"
   },
   {
    id: uuidv4(),
    username:"Apna Collge",
    content:"Shradha mam is the tutor for apna college"
   },
   {
    id: uuidv4(),
    username:"Bengaluru",
    content:"The Silicon City"
   }
]

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})


app.get("/posts/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
  let { username ,content} = req.body;
  let id = uuidv4();
  posts.push({id,username,content});
  console.log(req.body);
  res.redirect("/posts")
});


app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log("Requested ID:", id); // Log the requested ID
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs",{post})
});


// app.patch("/post/:id",(req,res)=>{
// let {id} = req.params;
// let newContent =  req.body.content;
// post.content = newContent;
// console.log(post);
// res.send("patch request working")
//   })
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;

  // Find the post with the given ID
  let post = posts.find((p) => p.id === id);

  // If the post with the given ID is found, update its content
  if (post) {
    post.content = newContent;
    console.log(post);
    res.send("Patch request successful");
  } else {
    res.status(404).send("Post not found");
  }
});

  app.get("/posts/:id/edit", (req, res) => {
      let { id } = req.params;
      let post = posts.find((p) => id === p.id);
      res.render("edit.ejs",{post})
    });

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect('/posts')
})






































// app.post("/register",(req,res)=>{
//   res.send("Standard POST response")
//   })
// app.set("view engine","ejs");
// app.get("/ig/:username",(req,res)=>{
//   let {username} = req.params;
//   const instaData = require('./data.json');
//   const data = instaData[username];
//   console.log(data);
//   res.render("instagram",{data})
// })

// app.get("/ig/:username",(req,res)=>{
//   let {username} = req.params;
//   res.render("instagram",{username})
// })

// app.get("/rolldice",(req,res)=>{
//   let diceval = Math.floor((Math.random()*6)+1);
//   res.render("rolldice",{diceval})
// })

































































// const http = require('http');
// const fs = require('fs');
// const url = require('url');


// const myserver = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.url} New Re received\n`;
//   const myUrl = url.parse(req.url);
//   console.log(myUrl)
//   fs.appendFile("log.txt", log, (err, data) => {


//     switch (myUrl.pathname) {
//       case "/":
//         res.end("Home page");
//         break;
//       case "/about":
//         res.end("About page");
//         break;
//       case "/skill":
//         res.end("Skill page");
//         break;
//       case "/contact":
//         res.end("contact page");
//         break;
//       default:
//         res.end("404 page");
//         break;
//     }
//   })
// })

// myserver.listen(8000, () => console.log('server started'))
