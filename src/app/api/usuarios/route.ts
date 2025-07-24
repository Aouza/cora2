import { NextResponse } from "next/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { desc } from "drizzle-orm";
import { withRetry } from "../../../../lib/db-wrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const usuariosData = await withRetry(
      () => db.select().from(profiles).orderBy(desc(profiles.createdAt)),
      "GET all users"
    );

    return NextResponse.json(usuariosData);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
