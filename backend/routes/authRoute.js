const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const route = express.Router();

route.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                isSuccessful: false,
                error: 'Email or Password is Missing'
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                isSuccessful: false,
                error: 'Email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            isSuccessful: true,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            isSuccessful: false,
            error: error.message
        });
    }
});

route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ isSuccessful: false, error: 'Email or Password is Missing' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ isSuccessful: false, error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ isSuccessful: false, error: 'Incorrect Password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '3h' });

        res.status(200).json({ isSuccessful: true, message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ isSuccessful: false, error: error.message });
    }
});

module.exports = route;
