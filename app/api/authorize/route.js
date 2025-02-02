import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secret = 'your_jwt_secret'; // Replace with your actual secret

export async function POST(req) {
    const auth = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            name: auth.name
        }
    });

    if (!user) {
        return Response.json({ message: "User not found" }, { status: 404 });
    } else if (user.password !== auth.password) {
        return Response.json({ message: "Invalid password" }, { status: 401 });
    } else {
        user.password = "********"; // Mask the password
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const response = Response.json(user, { status: 200 });
        response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
        return response;
    }
}