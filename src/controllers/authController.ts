import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';
import redis from '../config/redis';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    await redis.set(`user_${user._id}`, JSON.stringify(user), 'EX', 3600);

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
