const app = require("express")();
const bodyParser = require("body-parser");
const config = require("./config/config");

const dbConnection = require("./config/database");

dbConnection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.PORT, () => {
  console.log("Server started at port " + config.PORT);
});

app.use("/users", require("./route/user-route"));
app.use("/login", require("./route/authetication-route"));
