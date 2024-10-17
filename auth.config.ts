
// Step 1: of authentication
import type { NextAuthConfig } from "next-auth";

// session: period in which user is authenticated and allowed to access services.
// A session is essentially the user's authenticated state maintained by the server after the user logs in.
// Session Management: Track users authentication state across requests.
// 4 processes: create, store, refresh, delete.


// Auth setting: tells how auth works.
export const authConfig = {
    pages: {
        // tells nextauth that this is the signIn page.
        // whenever an user attempts to access protected routes, the next auth redirect user to login page.
        signIn: "/login",
    },
    callbacks: {
        // Protecting the routes
        // The authorized callback is called after the user has been authenticated and authorized. 
        // This callback is used to determine whether the user is allowed to access a protected route.

        // The steps how this callback works.
        // Step 1: user attempt to access protected routes
        // Step 2: NextAuth.js checks if the user is authenticated
        // Step 3: if the user is authenticated, Next.js call the authorized callback.
        // Step 4: Authorized callback checks the user's permission and return true and false.
        // Step 5 : true: user is allowed to access protected routes
        // Step 6: false: user is not allowed to access protected routes

        
        // Note: always copy this logic, untill unless updated.
        // auth contain user session provided by NextAuth
        authorized({auth, request: {nextUrl}}) {
            // in authorized callback dashboard route is protected.
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            // route protecting logic
            if (isOnDashboard) {
                if (isLoggedIn) {
                    return true; //user can access dashboard page only and only if logged in
                }
                return false; // this is where middleware tells protect the route, if not logged in dashboard can not be accessed.
            } else if (isLoggedIn) {
                // Redirecting logic.
                return Response.redirect(new URL('/dashboard', nextUrl)); // if user is logged in authorize or redirect him to dashboard page.
                // Produce a response that redired user to the dashboard page
                // nextUrl would typically represent the base URL (e.g., https://example.com). By passing /dashboard as the first argument, the final URL becomes https://example.com/dashboard
            }
            return true; //other than the dashboard routes can be authorized to access without authentication
        }
    },
    providers: [],
} satisfies NextAuthConfig;
// NextAuthConfig is an instance, that is authConfig object.
// interface NextAuthConfig {
//     // Callbacks
//     callbacks?: {
//       jwt?: (token: JWT, user: User, account: Account, profile: Profile, isNewUser: boolean) => Promise<JWT>;
//       session?: (session: Session, user: User) => Promise<Session>;
//       jwtVerify?: (token: JWT) => Promise<JWT>;
//     };
  
//     // Pages
//     pages?: {
//       signIn?: string | (() => Promise<React.ReactElement>);
//       signOut?: string | (() => Promise<React.ReactElement>);
//       error?: string | (() => Promise<React.ReactElement>);
//       verifyRequest?: string | (() => Promise<React.ReactElement>);
//       newUser?: string | (() => Promise<React.ReactElement>);
//     };
  
//     // Authentication Providers
//     providers?: Array<AuthProvider>;
  
//     // Session
//     session?: {
//       jwt?: boolean;
//       maxAge?: number;
//     };
  
//     // JWT
//     jwt?: {
//       secret?: string;
//       encryption?: boolean;
//       maxAge?: number;
//     };
  
//     // Debug
//     debug?: boolean;
  
//     // Themes
//     theme?: {
//       colorScheme?: 'light' | 'dark';
//     };
//   }

