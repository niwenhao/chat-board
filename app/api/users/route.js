import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const user = await req.json();

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      password: user.password,
      address: user.address,
      email: user.email,
      tel: user.tel
    }
  });

  return Response.json(newUser, { status: 200 });
}

export async function GET(req) {
  const users = await prisma.user.findMany();

  return Response.json(users, { status: 200 });
}

