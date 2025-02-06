import { NextResponse } from "next/server"; // Provides helper methods for constructing responses
import jwt from "jsonwebtoken"; // Used for JWT verification

import { PrismaClient } from "@prisma/client"; // Database client for Prisma

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

export async function GET(req) {
    // Attempt to retrieve token from cookies (set in /app/api/authorize/route.js)
    const token = req.cookies.get('token');
    if (!token) {
        // Return 401 Unauthorized response if token is missing
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Verify the JWT token using the secret key
    const user = jwt.verify(token.value, secret);
    if (!user) {
        // Return 401 Unauthorized response if token verification fails
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Retrieve user data along with their channels from the database
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
        // Return the list of channels the user is part of
        return NextResponse.json(userData.channels.map(c => c.channel), { status: 200 });
    } catch (e) {
        // Catch any errors and return a 401 Unauthorized response
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req) {
    // Retrieve token from cookies
    const token = req.cookies.get('token');
    if (!token) {
        // Return 401 Unauthorized response if token is absent
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Decode JWT token to extract user information
    const user = jwt.verify(token.value, secret);
    if (!user) {
        // Return 401 Unauthorized if token is invalid
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Process channel creation request
    try {
        // Extract new channel details from request body
        const { name, description } = await req.json();
        // Execute a transaction to create a channel and link it to the user
        const channel = await prisma.$transaction(async (prisma) => {
            // Create the new channel with provided data and set the user as manager
            const newChannel = await prisma.channel.create({
                data: {
                    name: name,
                    description: description,
                    manager: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            });

            // Link the user to the newly created channel
            await prisma.userChannel.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    channel: {
                        connect: {
                            id: newChannel.id
                        }
                    }
                }
            });

            // Return the newly created channel object
            return newChannel;
        });
        // Respond with the created channel data
        return NextResponse.json(channel, { status: 200 });
    } catch (e) {
        // Log any errors encountered during channel creation
        console.error(e);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}