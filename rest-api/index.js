let express = require('express');
const path = require('path');
const mongoose= require('mongoose');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoDb = require('./database/db');


mongoose.Promise=global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected successfully")
},
error=>{
    console.log("Database Error:"+error)
})
const bookStore = require('./node-backend/routes/book.routes');
const bookRoute = require('./node-backend/routes/book.routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
//api root
app.use('/api', bookRoute);
//port create
const port = process.env.port || 8080;
app.listen(port, ()=>{
    console.log("Listening Port on " +port);
})

//404 error handler...
app.use((req, res, next)=>{
    next(createError(404));
});
//base route
app.get('/', (req, res)=>{
    res.send('invalid Endpoint');
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});
app.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode=500;
    res.status(err.statusCode).send(err.message);
}); 