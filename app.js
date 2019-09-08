// importing modules
const express = require('express'),
app=express(),
mongooose = require('mongoose'),
cors=require('cors'),
bodyparser=require('body-parser')
path=require('path');

const route = require('./routes/route');

// mongodb connection
mongooose.connect('mongodb://localhost:27017/contactlist',{ useNewUrlParser: true },(err)=>{
    if(err) {console.log(err)}

    console.log('Connected to MongoDB');
});
// mongooose.connection.on('connected',()=>{
//     console.log("Connected to MongoDB");
// })


// middleware cores
app.use(cors());

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api', route);


// testing
app.get('/',(req,res)=>{
    res.send("Hello World")
})

const port = 3000;
app.listen(port , ()=>{
    console.log(`Server satrted @ ${port}`);
})