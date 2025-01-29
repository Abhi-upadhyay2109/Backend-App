const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    user: {type: String, required:true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  },{versionKey:false}
);

const ProductModel = mongoose.model("Product",productSchema);

module.exports = ProductModel;

