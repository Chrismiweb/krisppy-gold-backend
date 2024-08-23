const express =require("express");
const { connectDb } = require("./database/connectDb");
const { router } = require("./routes/handler");
const { ecommerceModel } = require("./models/Ecommerce.model");
const app = express()
const port = 2020;
app.use(express.json())

app.use('/', router)

app.get('/', (req,res)=>{
    console.log("app is running well")
})




app.listen(port, async() => {
    console.log(`Server started on port ${port}`);
    await connectDb()
});
