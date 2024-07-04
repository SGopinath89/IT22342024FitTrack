const express = require('express')
const mongoose= require ('mongoose')
const bodyParser = require('body-parser')
const dotenv =require('dotenv')

// Load environment variables from .env file
dotenv.config();

const app = express()

// Middleware
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGO_URI || 'mongodb+srv://sahanperera572:APiumal5#@cluster0.tsqan0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
//app.use('/api/users', require('./routes/users'));
//app.use('/api/schedules', require('./routes/schedules'));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
