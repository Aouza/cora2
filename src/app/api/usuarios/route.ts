import { NextResponse } from "next/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const usuariosData = await db
      .select()
      .from(profiles)
      .orderBy(desc(profiles.createdAt));

    return NextResponse.json(usuariosData);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
