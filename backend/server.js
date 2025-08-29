const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const getData = require("./routes/getData");

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

connectDB();


app.use("/auth", authRoutes);
app.use("/get", getData);



app.listen(3000, () => {
  console.log("On port 3000");
});