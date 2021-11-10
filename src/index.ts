import express from "express"

const app = express();

app.get("/", (req,res) =>{
    res.send({status:200,msg:"OK", data:null})
})

const port = process.env.PORT || 5000;
app.listen(port,() =>{
    console.log(port);
    console.log("Server is up and running on port 5000")
})