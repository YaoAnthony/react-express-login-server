const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethods: [{
        cardNumber: { type: String, required: true },
        cardHolderName: { type: String, required: true },
        expiryDate: { type: String, required: true },
        billingAddress: { type: String, required: true }
    }],
    teams: [{
        name: { type: String, required: true },
        leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
        createdAt: { type: Date, default: Date.now }
    }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
