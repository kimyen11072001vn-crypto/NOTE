import { Request, Response } from 'express';
import classService from '../services/classService';

export class ClassController {
  async createClass(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { name, code } = req.body;

      if (!name || !code) {
        return res.status(400).json({
          error: 'Missing required fields: name, code',
        });
      }

      const classData = await classService.createClass(name, code, req.user.userId);

      res.status(201).json({
        success: true,
        data: classData,
        message: 'Class created successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create class';
      res.status(400).json({ error: message });
    }
  }

  async getClasses(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const classes = await classService.getClassesByTeacher(req.user.userId);

      res.status(200).json({
        success: true,
        data: classes,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch classes';
      res.status(500).json({ error: message });
    }
  }

  async getClassById(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { classId } = req.params;
      const classData = await classService.getClassById(classId);

      if (!classData) {
        return res.status(404).json({ error: 'Class not found' });
      }

      // Verify ownership
      if (classData.teacherId !== req.user.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      res.status(200).json({
        success: true,
        data: classData,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch class';
      res.status(500).json({ error: message });
    }
  }

  async updateClass(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { classId } = req.params;
      const { name, code } = req.body;

      const classData = await classService.updateClass(classId, req.user.userId, {
        name,
        code,
      });

      res.status(200).json({
        success: true,
        data: classData,
        message: 'Class updated successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update class';
      res.status(400).json({ error: message });
    }
  }

  async deleteClass(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { classId } = req.params;

      await classService.deleteClass(classId, req.user.userId);

      res.status(200).json({
        success: true,
        message: 'Class deleted successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete class';
      res.status(400).json({ error: message });
    }
  }
}

export default new ClassController();
