import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      email?: string;
      role?: string;
      credit_left?: number;
      lastLogin?: Date;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    email?: string;
    role?: string;
    credit_left?: number;
    lastLogin?: Date;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    email?: string;
    role?: string;
    credit_left?: number;
    lastLogin?: Date;
  }
}
