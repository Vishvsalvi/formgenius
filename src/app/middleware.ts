export { auth as middleware } from "@/app/auth"
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { cookies } from 'next/headers';

// export  async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;    
//   const isPublic = path === '/auth/login' || path === '/';


//     // const token = request.cookies.get('__Secure-next-auth.session-token')?.value || '';
//     const token = cookies().get('authjs.session-token')?.value || '';
//     console.log("This is token", token);

//   // If the user is on a public page and has a token, redirect to home page
//   if (isPublic && token) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // If the user is not on a public page and doesn't have a token, redirect to signin page
//   if (!isPublic && !token) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/', '/auth/login', '/dashboard', '/survey/form-view/:path*', 'report/:path*',
//   ],
// };