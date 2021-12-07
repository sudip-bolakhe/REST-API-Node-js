const router = require("express").Router();
const User = require("../model/user");


router.post("/", async(req, res) =>{
    const  user = new User({
        name :req.body.name,
        address:  req.body.address,
        date_of_birth : req.body.date_of_birth,
        email : req.body.email
    });

    const savedUser = await user.save();
    res.json(savedUser);
});

router.get("/", async(req, res) =>{
    const users = await User.find({});
    res.json(users);
});

router.get("/:id", async(req, res) =>{
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
});

router.delete("/:id", async(req, res) =>{
    await User.deleteOne({__id : req.params.id});
    res.json({"message" : "Deleted successfully"});
});

router.put("/",async(req, res) =>{
    var toUpdate = req.body;
    var id = req.body._id;
    await User.findOneAndUpdate({_id : id}, toUpdate);
    res.json({"message" :" Updated Successfully"});
});
module.exports = router;