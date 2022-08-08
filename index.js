const express = require("express");
var bodyParser = require('body-parser')
const connect = require("./config/db")
const app = express();
const path = require('path');
const router = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

//connect MongoDb data base
connect();


app.use(bodyParser.json());

app.use('/', router);
app.use('/', postRoutes);
app.use('/', profileRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build/')));
    app.get('*',()=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT , ()=>{
    console.log("Server is running on PORT");
});
