import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

export async function GET(req) {
    // check if the user is authenticated by checking the httpOnly cookie token seted by the /app/api/authorize/route.js
    const token = req.cookies.get('token');
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // decode the jwt token to get the user information
    const user = jwt.verify(token.value, secret);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Search for the user using id in the token jwt and get the channels.
    try {

        const userData = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                channels: {
                    include: {
                        channel: true
                    }
                }
            }
        });
        return NextResponse.json(userData.channels.map(c => c.channel), { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}