const User = require('../models/User');
const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }
    
    const token = generateToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;
    
    return { user: userObj, token };
  }

  async getMe(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user || !(await user.comparePassword(currentPassword))) {
      throw new AppError('Invalid current password', 401);
    }
    
    user.password = newPassword;
    await user.save();
    
    return { message: 'Password changed successfully' };
  }
}

module.exports = new AuthService();
