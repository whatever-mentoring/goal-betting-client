import 'next-auth';
import { AuthUser } from './api/auth/[...nextauth]/route';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
