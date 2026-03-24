const express = require("express")
const User = require("../models/User")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashed
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        return res.status(500).json({ message: "Registration failed" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const found = await bcrypt.compare(password, user.password)
        if (!found) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        return res.status(500).json({ message: "Login failed" })
    }
})

module.exports = router