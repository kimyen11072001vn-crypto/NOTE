// User types
export interface IUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: 'TEACHER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPayload {
  id: string;
  email: string;
  fullName: string;
  role: 'TEACHER' | 'ADMIN';
}

export interface IAuthResponse {
  user: IUserPayload;
  token: string;
  refreshToken?: string;
}

// Class types
export interface IClass {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Student types
export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  classId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Feedback types
export interface IFeedback {
  id: string;
  studentId: string;
  classId: string;
  teacherId: string;
  feedbackDate: Date;
  speaking?: string;
  listening?: string;
  reading?: string;
  writing?: string;
  vocabulary?: string;
  grammar?: string;
  behaviour?: string;
  homework?: string;
  participation?: string;
  customComment?: string;
  aiGenerated: boolean;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request/Response types
export interface IRegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

// JWT Payload
export interface IJWTPayload {
  userId: string;
  email: string;
  role: 'TEACHER' | 'ADMIN';
}
