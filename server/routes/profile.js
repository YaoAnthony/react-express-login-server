const express = require('express');
const router = express.Router();


const User = require('../models/User');
const Profile = require('../models/Profile');

const authenticateToken = require('../middlewares/authenticateToken');

const paypal = require('@paypal/checkout-server-sdk');
// const { createPayPalClient, paypal } = require('./paypal');

// 配置 PayPal 环境
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

//test paypal client
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

const getProfileByUserId = async (userId) => {
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return null;
        }

        const profile = await Profile.findOne({ user: userId }).lean();

        return profile;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return null;
        }
        
        return user;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// 获得用户的profile
router.get('/getProfile', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const profile = getProfileByUserId(userId);
    res.json({
        _id: userId,
        profile,
    });
});

router.get('/getProfileAndUser', authenticateToken, async (req, res) => {   
    const userId = req.user.id;
    const profile = await getProfileByUserId(userId);
    const user = await getUserById(userId);
    res.json({
        profile,
        user,
    });
});

module.exports = router;