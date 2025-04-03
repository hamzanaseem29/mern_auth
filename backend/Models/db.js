import mongoose from "mongoose";
const uri = process.env.URI;

mongoose.connect(uri)
.then(() => {
  console.log('Connected to MongoDB')  
}).catch((err) => {
    console.log(err)
})
