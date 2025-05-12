import prisma from '@/lib/server/prisma';

export async function GET() {
    const postList = await prisma.post.findMany({})
    return Response.json({
      ok:true,
      postList
    })
  }