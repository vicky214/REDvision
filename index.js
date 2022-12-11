const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const {MONGOURI, PORT} = require('./config/index');
const authRoutes = require('./routes/auth')

const port = PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
mongoose.connect(MONGOURI,{
    useUnifiedTopology: true,
    useNewUrlParser:true,
});
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb yeah..")
});

mongoose.connection.on('error',(err)=>{
    console.log("error during connection" ,err)
});

app.use('/api',authRoutes);

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static('client/build'))
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     });
// }

app.listen(port,()=>{console.log(`server is running on ${port}`)});