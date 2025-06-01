import prisma from "@/lib/server/prisma";
import { SessionData, sessionOptions } from "@/lib/session";
import { generateSaltedHash } from "@/lib/utils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, ctx: any) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  const { email, password } = await req.json();

  const passwordHash = generateSaltedHash(password);
  const user = await prisma.user.findFirst({
    where: {
      email,
      passwordHash,
    },
  });

  if (user) {
    // 로그인에 성공한 경우
    session.userId = user.id;
    session.isLoggedIn = true;
    await session.save();
    return NextResponse.json({
      ok: true,
    });
  }

  return NextResponse.json({
    ok: false,
  });
}
