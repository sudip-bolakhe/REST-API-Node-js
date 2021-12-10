const userRouter = require("express").Router();
const userService = require("../service/UserService");
const auth = require("../middleware/auth");

userRouter.post("/", auth.autheticate, async (req, res) => {
  var body = req.body;
  userService
    .addUser(body)
    .then((result) => {
      res.status(200).json({ Message: result });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ Message: err.message });
    });
});

userRouter.get("/", auth.autheticate, async (req, res) => {
  userService.findAll().then((data) => {
    res.status(200).json(data);
  });
});

userRouter.get("/:id", auth.autheticate, async (req, res) => {
  const id = req.params.id;
  userService
    .findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ Message: err.message });
    });
});

userRouter.delete("/:id", auth.autheticate, async (req, res) => {
  const id = req.params.id;
  userService
    .deleteById(id)
    .then((message) => {
      res.status(200).json({ Message: message });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ Message: err.message });
    });
});

userRouter.put("/", auth.autheticate, async (req, res) => {
  var toUpdate = req.body;
  var id = req.body._id;
  userService
    .updateUser(id, toUpdate)
    .then((message) => {
      res.json({ Message: message });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ Message: err.message });
    });
});

module.exports = userRouter;
