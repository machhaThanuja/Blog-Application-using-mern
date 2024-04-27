const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register",async(req,res)=>{
    try{
        
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: req.body.password,

        });

        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
})

//login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // If authentication is successful, you may want to omit the password before sending the user data
        const { password: _, ...userData } = user.toObject();

        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;