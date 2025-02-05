import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const channels = await prisma.channel.findMany();
    return NextResponse.json(channels, { status: 200 });
}