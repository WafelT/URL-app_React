const { Router, response, request } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'unvalid email').isEmail(),
        check('password', 'minimal length of password 6 symbols')
        .isLength({ min: 6 }),
    ],
    async (req, res) => {
    try {
        console.log('Body', req.body);

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data to registration'
            });
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'Such user already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User( {email, password: hashedPassword});

        await user.save();

        res.status(201).json({ message: 'User created'});

    } catch (e) {
        response.status(500).json({ message: 'Something goes wrong, try again...'})
    }
});

// /api/auth/login 
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data to login'
            });
        }

        const {email, password} = req.body

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User undefined' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password, try again'});
        }
        
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id });

    } catch (e) {
        response.status(500).json({ message: 'Something goes wrong, try again...'})
    }
});

module.exports = router