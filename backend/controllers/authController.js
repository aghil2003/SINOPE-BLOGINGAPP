import { authService } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { token, user } = await authService.registerUser(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.userId);
    res.json(user);
  } catch(err) {
    console.log(err)
    res.status(404).json({ message: 'User not found' });
  }
};
