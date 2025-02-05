import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const userId = Number((await params).userId);
  const user = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: user.name,
        password: user.password,
        address: user.address,
        email: user.email,
        tel: user.tel,
        updatedAt: new Date()
      }
    });

    return Response.json(updatedUser, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
