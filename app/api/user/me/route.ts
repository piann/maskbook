import prisma from "@/lib/server/prisma";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn || !session.userId) {
    return NextResponse.json({
      ok: false,
      error: "Authentication required. Please log in.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      // This case should ideally not happen if session is valid
      // but userId doesn't match any user.
      // Clearing the potentially invalid session.
      await session.save();
      session.destroy();
      return NextResponse.json({
        ok: false,
        error: "User not found. Session has been cleared.",
      });
    }

    return NextResponse.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error("/api/user/me Error:", error);
    return NextResponse.json({
      ok: false,
      error: "An unexpected error occurred.",
    });
  }
}
