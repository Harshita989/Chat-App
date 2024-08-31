const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Neha",
    to: "Priya",
    msg: "Send me the answers",
    created_at: new Date(),
  },
  {
    from:"Niharika",
    to:"Nidhi",
    msg:"Lets go for a movie",
    created_at:new Date()
  },
  {
    from:"krish",
    to:"Deep",
    msg:"You did so wrong",
    created_at:new Date()
  },
  {
    from:"Diljit",
    to:"Sandeep",
    msg:"I m in Delhi",
    created_at:new Date()
  },
  {
    from:"Aman",
    to:"Pratap",
    msg:"Lets do Bhangra",
    created_at:new Date()
  }
];
Chat.insertMany(allChats);
