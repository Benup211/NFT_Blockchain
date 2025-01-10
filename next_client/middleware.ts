import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const isDashboardRoute = url.pathname === "/dashboard";
    const isLoginRoute = url.pathname === "/login";

    try {
        const cookies = req.headers.get("cookie") || "";

        console.log(cookies);
        const response = await axiosInstance.get("/api/user/getUser", {
            headers: {
                Cookie: cookies,
            },
        });
        const isAuthenticated = response.status === 200;
        if (isDashboardRoute && !isAuthenticated) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
        if (isLoginRoute && isAuthenticated) {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    } catch (error) {
        if (isDashboardRoute) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login"],
};
