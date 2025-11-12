// utils/loginUser.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PendingAuth = require('../models/PendingAuth');

/**
 *  returns user if email and password are correct
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');

  return { user };
}
module.exports = loginUser;
