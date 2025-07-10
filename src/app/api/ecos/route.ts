import { NextResponse } from "next/server";
import { db } from "@/db";
import { ecos } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const ecosData = await db.select().from(ecos).orderBy(desc(ecos.createdAt));

    return NextResponse.json(ecosData);
  } catch (error) {
    console.error("Erro ao buscar ecos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
