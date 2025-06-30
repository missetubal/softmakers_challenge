import { Request, Response } from 'express';
import { PostRepository } from '../repositories';
export const createPost = async (request: Request, response: Response) => {
  const { title, content } = request.body;
  const authorId = request.userId;

  if (!title || !content) {
    response.status(400).json({
      message: 'Missing fields: title, content are required',
    });
    return;
  }

  if (!authorId) {
    response.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    const post = await PostRepository.create({
      title,
      content,
      authorId,
    });
    response.status(201).json(post);

    return;
  } catch (err) {
    console.log(err);
    response.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const updatePost = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { title, content } = request.body;
  const userId = request.userId;

  try {
    const post = await PostRepository.findById(Number(id));
    if (!post) {
      response.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.authorId !== userId) {
      response.status(403).json({ message: 'Unauthorized' });
      return;
    }

    const updatedPost = await PostRepository.update(Number(id), {
      title,
      content,
    });
    response.status(200).json(updatedPost);
    return;
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong' });
    console.log(err);
  }
};

export const deletePost = async (request: Request, response: Response) => {
  const { id } = request.params;
  const userId = request.userId;

  try {
    const post = await PostRepository.findById(Number(id));
    if (!post) {
      response.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.authorId !== userId) {
      response.status(403).json({ message: 'Unauthorized' });
      return;
    }

    await PostRepository.delete(Number(id));
    response.status(200).json({ message: 'Post deleted successfully' });
    return;
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong' });
    console.log(err);
  }
};

export const getPostById = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const post = await PostRepository.findById(Number(id));
    if (!post) {
      response.status(404).json({ message: 'Post not found' });
      return;
    }
    response.status(200).json(post);
    return;
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong' });
    console.log(err);

    return;
  }
};

export const getAllPosts = async (request: Request, response: Response) => {
  const { order = 'desc', onlyMine } = request.query;
  const userId = request.userId;

  try {
    const posts =
      onlyMine === 'true'
        ? await PostRepository.findByUser(
            userId!,
            String(order) as 'asc' | 'desc'
          )
        : await PostRepository.findAll(String(order) as 'asc' | 'desc');
    response.status(200).json(posts);
    return;
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong' });
    console.log(err);

    return;
  }
};
