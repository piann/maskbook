import prisma from '@/lib/server/prisma';
import { NextRequest } from 'next/server';
import { Context } from 'vm';

export async function GET(
    req:NextRequest,
    res:any,
) {
    let id = res.params.id;
    if(!id){
        return Response.json({
            ok:false
        })
    }

    id = +id;

    const post = await prisma.post.findUnique({
        where:{
            id
        }
    })

    return Response.json({
      ok:true,
      post
    })
  }