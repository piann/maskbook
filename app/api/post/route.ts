import prisma from '@/lib/server/prisma';

export async function GET() {
    const res = await prisma.post.findMany({})
    console.log(res);
    return Response.json('ok!')
  }