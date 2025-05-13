import prisma from '@/lib/server/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req:NextRequest,
    ctx:any
) {
    const {id} = await ctx.params;
    if(!id){
        return NextResponse.json({
            ok:false
        })
    }

    const numId = Number(id);

    const post = await prisma.post.findUnique({
        where:{
            id:numId
        }
    })

    return NextResponse.json({
      ok:true,
      post
    })
  }