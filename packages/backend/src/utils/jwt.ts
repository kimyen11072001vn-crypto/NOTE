import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export const generateToken = (payload: IJWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyToken = (token: string): IJWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IJWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): IJWTPayload | null => {
  try {
    const decoded = jwt.decode(token) as IJWTPayload | null;
    return decoded;
  } catch (error) {
    return null;
  }
};
