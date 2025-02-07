import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const userId = Number((await params).userId);
  const user = await req.json();

  try {
    const data = {}
    if (user.name) data.name = user.name;
    if (user.password) data.password = user.password;
    if (user.address) data.address = user.address;
    if (user.email) data.email = user.email;
    if (user.tel) data.tel = user.tel;
    if (user.defaultChannelId) data.defaultChannelId = user.defaultChannelId;
    data.updatedAt = new Date();
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: data
    });

    return Response.json(updatedUser, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
