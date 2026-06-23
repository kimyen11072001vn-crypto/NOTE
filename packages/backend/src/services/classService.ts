import { PrismaClient } from '@prisma/client';
import { IClass } from '../types';

const prisma = new PrismaClient();

export class ClassService {
  async createClass(
    name: string,
    code: string,
    teacherId: string
  ): Promise<IClass> {
    // Check if class code already exists
    const existingClass = await prisma.class.findUnique({
      where: { code },
    });

    if (existingClass) {
      throw new Error('Class code already exists');
    }

    const classData = await prisma.class.create({
      data: {
        name,
        code,
        teacherId,
      },
    });

    return {
      id: classData.id,
      name: classData.name,
      code: classData.code,
      teacherId: classData.teacherId,
      createdAt: classData.createdAt,
      updatedAt: classData.updatedAt,
    };
  }

  async getClassesByTeacher(teacherId: string): Promise<IClass[]> {
    const classes = await prisma.class.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' },
    });

    return classes.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
      teacherId: c.teacherId,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  async getClassById(classId: string): Promise<IClass | null> {
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData) {
      return null;
    }

    return {
      id: classData.id,
      name: classData.name,
      code: classData.code,
      teacherId: classData.teacherId,
      createdAt: classData.createdAt,
      updatedAt: classData.updatedAt,
    };
  }

  async updateClass(
    classId: string,
    teacherId: string,
    data: { name?: string; code?: string }
  ): Promise<IClass> {
    // Verify ownership
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData || classData.teacherId !== teacherId) {
      throw new Error('Class not found or unauthorized');
    }

    // Check if new code already exists
    if (data.code && data.code !== classData.code) {
      const existingClass = await prisma.class.findUnique({
        where: { code: data.code },
      });
      if (existingClass) {
        throw new Error('Class code already exists');
      }
    }

    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data,
    });

    return {
      id: updatedClass.id,
      name: updatedClass.name,
      code: updatedClass.code,
      teacherId: updatedClass.teacherId,
      createdAt: updatedClass.createdAt,
      updatedAt: updatedClass.updatedAt,
    };
  }

  async deleteClass(classId: string, teacherId: string): Promise<void> {
    // Verify ownership
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData || classData.teacherId !== teacherId) {
      throw new Error('Class not found or unauthorized');
    }

    // Delete all students in the class first
    await prisma.student.deleteMany({
      where: { classId },
    });

    // Delete all feedback for this class
    await prisma.feedback.deleteMany({
      where: { classId },
    });

    // Delete all attendance for this class
    await prisma.attendance.deleteMany({
      where: { classId },
    });

    // Delete the class
    await prisma.class.delete({
      where: { id: classId },
    });
  }

  async getStudentCount(classId: string): Promise<number> {
    return await prisma.student.count({
      where: { classId },
    });
  }
}

export default new ClassService();
