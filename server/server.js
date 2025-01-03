const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
const bcrypt = require('bcryptjs');
const app = express();
const port = 5000;
const fileUpload = require('express-fileupload');
// Add this import at the top with other imports
const uploadController = require('./src/controllers/uploadController');
// DOTENV CONFIG
dotenv.config();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// CORS
app.use(cors());

// MONGODB CONNECTION
if (!process.env.MONGO_URI) {
  throw Error("Database connection string not found");
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Succesfully connected to MongoDB");
  }).catch((err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  });


// ROUTES
app.get("/", (req, res) => {
    res.send("Coba Backend");
  });
app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/barang", require("./src/routes/barangRoutes"));
// Add the upload route
app.post('/api/upload', uploadController.uploadImage);
app.delete('/api/upload', uploadController.deleteImage);

// APP START
app.listen(port, () => console.log(`Server running on port ${port}`));