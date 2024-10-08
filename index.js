const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOvverride=require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOvverride("_method"));

main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //   console.log(chats);
  res.render("index.ejs", { chats });
});
//new route
app.get("/chats/new", (req, res) => {
  // res.send("new route working");
  res.render("new.ejs");
});
//create route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  console.log(newChat);
  newChat.save();
  res.redirect("/chats");
});
 //edit route

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let chats= await Chat.findById(id);
    res.render("edit.ejs",{chats});
    
});
 //update route

app.put("/chats/:id", async(req,res)=>{
    let {id}=req.params;
    let{ msg: newmsg}=req.body;
    console.log(newmsg);
    let updatedChat= await Chat.findByIdAndUpdate(
        id,{msg:newmsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Destroy Route
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let chattobeDeleted= await Chat.findByIdAndDelete(id);
    console.log(chattobeDeleted);
    res.redirect("/chats");
})
app.get("/", (req, res) => {
  res.send("root is working");
});
app.listen(8080, () => {
  console.log("app is listening on port 8080");
});
