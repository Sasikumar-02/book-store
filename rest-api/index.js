const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const MONGO_URI = process.env.MONGO_URI
const port = process.env.port || 8000;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
const bookRoute = require('./node-backend/routes/book.routes'); 
app.use('/api', bookRoute); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});