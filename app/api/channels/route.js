import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export function GET(req) {
    // check if the user is authenticated by checking the httpOnly cookie token seted by the /app/api/authorize/route.js
    const token = req.cookies.token;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // decode the jwt token to get the user information
    const user = jwt.verify(token, secret);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const resp = NextResponse.json({ message: "Hello, world!" });
    return resp;
}