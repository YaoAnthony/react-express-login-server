const express = require('express');
const router = express.Router();


const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');

const jwt = require('jsonwebtoken');


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

// Route to upgrade a user's subscription
router.post('/upgrade-subscription', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { level, renewalPeriod } = req.body;

        // Validate subscription level and renewal period
        const validLevels = ['individual', 'enterprise'];
        if (!validLevels.includes(level)) {
            return res.status(400).json({ message: 'Invalid subscription level for upgrade.' });
        }
        const validPeriods = ['monthly', 'yearly'];
        if (!validPeriods.includes(renewalPeriod)) {
            return res.status(400).json({ message: 'Invalid renewal period.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'subscription.level': level,
                'subscription.subscribedAt': new Date(),
                'subscription.renewalPeriod': renewalPeriod,
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription upgraded successfully.',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Error upgrading subscription:', err);
        res.status(500).json({ message: 'Failed to upgrade subscription', error: err.message });
    }
});

// Route to downgrade a user's subscription to free
router.post('/downgrade-subscription', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'subscription.level': 'free',
                'subscription.subscribedAt': null,
                'subscription.renewalPeriod': null,
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription downgraded to free.',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Error downgrading subscription:', err);
        res.status(500).json({ message: 'Failed to downgrade subscription', error: err.message });
    }
});

// Route to cancel a subscription (functionally same as downgrading to free)
router.post('/cancel-subscription', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                'subscription.level': 'free',
                'subscription.subscribedAt': null,
                'subscription.renewalPeriod': null,
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully.',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Error cancelling subscription:', err);
        res.status(500).json({ message: 'Failed to cancel subscription', error: err.message });
    }
});


module.exports = router;