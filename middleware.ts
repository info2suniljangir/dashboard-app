// Setep 2: of authentication
// Note: copy this file exact as it is in all the applications.
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
// employing Middleware for this task is that the protected routes will not even start rendering until the Middleware verifies the authentication
// auth property has the singIn and signOut methods
// this it the way of telling the appliction that user is authenticated or not.


// this middleware tells that if user is authenticated then and only then user is allowed to access protected routes.
export default NextAuth(authConfig).auth;
 

// custom middleware setup.
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // on which routes middleware run and on which routes middleware does not run.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};