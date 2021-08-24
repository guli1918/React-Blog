const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

//UPDATE User
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(saltRounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
            console.log(updatedUser)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account.")
    }
});

//DELETE User

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                if (user) {
                    // await Post.deleteMany({ username: user.username })
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json(`User named ${user.username} has been deleted!`)
                }
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
            res.status(404).json(`User: ${user.username}  not found!`)
        }
    } else {
        res.status(401).json("You can delete only your account.")
    }
});

//GET USER

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;