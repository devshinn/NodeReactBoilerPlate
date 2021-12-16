const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const mongoose = require("mongoose");


const config = require("./config/key");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const connect = mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}`)
});

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


//router

app.get('/',(req,res)=>{
  res.json({Success:true})
})

app.use('/api/users', require('./router/users'))