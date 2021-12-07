const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

app.listen(process.env.PORT, () =>{
    console.log("Connected to server " + process.env.PORT);
});


app.use("/users", require("./route/user-route"));

