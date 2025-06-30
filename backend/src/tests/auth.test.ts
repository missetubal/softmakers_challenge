import request from 'supertest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import app from '..';
import { UserRepository } from '../repositories';

jest.mock('../repositories/user-repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'hashedpassword123',
};

describe('Auth', () => {
  describe('Register', () => {
    it('should return 201 when new user is registered', async () => {
      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword123');
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const response = await request(app).post('/auth/register').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User created successfully' });
    });

    it('should return 400 if user already exists', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).post('/auth/register').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'User already exists' });
    });
  });

  describe('Login', () => {
    it('should return token if credentials are valid', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'token',
      });
    });
    it('should return 401 on invalid credentials', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid credentials',
      });
    });
    it('should return 404 if user not found', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'User not found',
      });
    });
  });
});
