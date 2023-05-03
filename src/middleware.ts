import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {


        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
            console.log('ENTROU AQUI');

            return NextResponse.rewrite(
                new URL("/login?message=Área restrita", req.url)
            );
        }


    },
    {
        //callbacks: {
        //    authorized: ({ token }) => !!token,
        //  },
    }

)

export const config = {
    matcher: ["/admin/:path*"],
};