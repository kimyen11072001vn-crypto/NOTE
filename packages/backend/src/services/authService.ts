import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { validateEmail, validatePassword, validateFullName } from '../utils/validation';
import { IRegisterRequest, ILoginRequest, IAuthResponse, IUserPayload } from '../types';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: IRegisterRequest): Promise<IAuthResponse> {
    // Validation
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(data.password)) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!validateFullName(data.fullName)) {
      throw new Error('Full name must be at least 2 characters');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        role: 'TEACHER', // Default role
      },
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'TEACHER' | 'ADMIN',
    });

    const userPayload: IUserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'TEACHER' | 'ADMIN',
    };

    return {
      user: userPayload,
      token,
    };
  }

  async login(data: ILoginRequest): Promise<IAuthResponse> {
    // Validation
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (!data.password) {
      throw new Error('Password is required');
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'TEACHER' | 'ADMIN',
    });

    const userPayload: IUserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'TEACHER' | 'ADMIN',
    };

    return {
      user: userPayload,
      token,
    };
  }

  async getUserById(userId: string): Promise<IUserPayload | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'TEACHER' | 'ADMIN',
    };
  }
}

export default new AuthService();
