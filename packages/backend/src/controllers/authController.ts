import { Request, Response } from 'express';
import authService from '../services/authService';
import { IRegisterRequest, ILoginRequest } from '../types';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, fullName } = req.body as IRegisterRequest;

      if (!email || !password || !fullName) {
        return res.status(400).json({
          error: 'Missing required fields: email, password, fullName',
        });
      }

      const result = await authService.register({ email, password, fullName });

      res.status(201).json({
        success: true,
        data: result,
        message: 'User registered successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      res.status(400).json({
        error: message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Missing required fields: email, password',
        });
      }

      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({
        error: message,
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await authService.getUserById(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get user';
      res.status(500).json({
        error: message,
      });
    }
  }
}

export default new AuthController();
