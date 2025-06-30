import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (request: Request, response: Response) => {
  console.log('register endpoint called');

  const { email, password } = request.body;

  try {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      response.status(400).json({ message: 'User already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await UserRepository.create({
      email,
      password: hashedPassword,
    });
    response
      .status(201)
      .json({ message: 'User created successfully' })
      .json(id);
    return;
  } catch (error) {
    response.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const listAll = async (request: Request, response: Response) => {
  try {
    const user = await UserRepository.listAll();

    response.json(user);
    return;
  } catch (error) {
    response.status(500).json({ message: 'Something went wrong' });
    return;
  }
};
