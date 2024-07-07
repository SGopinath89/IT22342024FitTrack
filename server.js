const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const config = require('config');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const MONGO_URI = "mongodb+srv://fitTrackDB:hatVQCmbzGsF40RW@cluster0.tsqan0p.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI, {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
