const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys');
const PORT = process.env.PORT || 5000 ;



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});
mongoose.connection.on('connected',()=>{
    console.log('connected to DB');
});
mongoose.connection.on('error',()=>{
    console.log('error connected to DB');
});

require('./models/user');
require('./models/todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('./routes/todo'));
app.use(require('./routes/user'));

app.listen(PORT,()=>{
    console.log('server is running');
})