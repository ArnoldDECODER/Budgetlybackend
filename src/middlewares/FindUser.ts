import User from '../models/User';

export const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};