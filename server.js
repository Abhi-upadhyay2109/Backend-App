const express = require("express");
const userRouter = require("./routes/user.route");
const mongoDb = require("./config/db");
require('dotenv').config();
const cors = require("cors");
const productRouter = require("./routes/product.route");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Hello world !")
});

app.use("/user",userRouter);
app.use("/products",productRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT , ()=>{
  mongoDb();
  console.log(`Server is running at http://localhost:${PORT}`)
});