import request from 'supertest';
import app from '..';
import { PostRepository } from '../repositories';
import { Post } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

jest.mock('../repositories/post-repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const fixedDate = faker.date.recent();

const mockPost: Post = {
  title: 'First Post',
  content: 'First post description',
  authorId: 1,
  createdAt: fixedDate,
  id: 1,
};

const token = 'valid.jwt.token';
(jwt.verify as jest.Mock).mockImplementation(() => ({ id: 1 }));

describe('Post Controller', () => {
  it('should return all posts', async () => {
    (PostRepository.findAll as jest.Mock).mockResolvedValue(mockPost);

    const response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...mockPost,
        createdAt: fixedDate.toISOString(),
      })
    );
  });

  it('should return a post by id', async () => {
    (PostRepository.findById as jest.Mock).mockResolvedValue(mockPost);

    const response = await request(app)
      .get('/posts/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...mockPost,
        createdAt: fixedDate.toISOString(),
      })
    );
  });

  it('should return 404 if post not found', async () => {
    (PostRepository.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/posts/999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post not found' });
  });

  it('should create a post', async () => {
    (PostRepository.create as jest.Mock).mockResolvedValue(mockPost);

    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: mockPost.title, content: mockPost.content });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...mockPost,
        createdAt: fixedDate.toISOString(),
      })
    );
  });

  it('should return 400 when creating a post with invalid data', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '', content: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Missing fields: title, content are required',
    });
  });

  it('should update a post', async () => {
    const updatedPost = {
      ...mockPost,
      title: 'Updated Title',
      createdAt: fixedDate,
    };
    (PostRepository.findById as jest.Mock).mockResolvedValue(mockPost);
    (PostRepository.update as jest.Mock).mockResolvedValue(updatedPost);

    const response = await request(app)
      .put('/posts/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title', content: mockPost.content });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...updatedPost,
        createdAt: fixedDate.toISOString(),
      })
    );
  });

  it('should return 404 when updating non-existent post', async () => {
    (PostRepository.findById as jest.Mock).mockResolvedValue(null);
    (PostRepository.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put('/posts/999')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated', content: 'Updated' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post not found' });
  });

  it('should delete a post', async () => {
    (PostRepository.findById as jest.Mock).mockResolvedValue(mockPost);
    (PostRepository.delete as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .delete('/posts/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should return 404 when deleting non-existent post', async () => {
    (PostRepository.delete as jest.Mock).mockResolvedValue(false);
    (PostRepository.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .delete('/posts/999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post not found' });
  });
});
