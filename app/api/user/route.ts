import prisma from '@/lib/server/prisma';
import { generateSaltedHash } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req:NextRequest,
    ctx:any
) {
    const { email, password } = await req.json();

    const passwordHash = generateSaltedHash(password);
    const post = await prisma.user.create({
        data:{
            email,
            passwordHash
        }
    })

    if(post){
        return NextResponse.json({
            ok:true,
        })
    }

    return NextResponse.json({
        ok:false,
    })

  }