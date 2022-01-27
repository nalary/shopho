const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY),
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong credentials !");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY); 
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Wrong credentials !");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" },
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;