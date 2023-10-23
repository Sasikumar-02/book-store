const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect('mongodb+srv://sasikumar:sasikumar@admin.xuv4ysl.mongodb.net/bookstore?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
const bookRoute = require('./node-backend/routes/book.routes'); 
app.use('/api', bookRoute); 

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});