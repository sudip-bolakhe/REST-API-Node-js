const authRouter = require("express").Router();
const authService = require("../middleware/auth");

authRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  authService
    .login(email, password)
    .then((token) => {
      console.log("Token generated is : " + token);
      res.header("Authorization", token);
      res.status(200).json({ Message: "Logged in successful" });
    })
    .catch((err) => {
      console.log("Error caught " + err);
      console.log(err.mesaage);
      res.status(400).json({ Mesaage: err.mesaage });
    });
});

module.exports = authRouter;
