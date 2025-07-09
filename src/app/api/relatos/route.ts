import { NextRequest, NextResponse } from "next/server";
import {
  inserirRelatoSeguro,
  buscarRelatosComValidacao,
} from "../../../../db/queries-validated";
import {
  safeValidateData,
  createRelatoSchema,
} from "../../../../db/validations";
import { z } from "zod";

// POST - Criar novo relato
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados usando Zod
    const validation = safeValidateData(createRelatoSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Inserir relato com validação
    const result = await inserirRelatoSeguro(validation.data);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar relato:", error);
    return NextResponse.json(
      {
        success: false,
        errors: ["Erro interno do servidor"],
      },
      { status: 500 }
    );
  }
}

// GET - Buscar relatos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validação simples dos parâmetros
    const userId = searchParams.get("userId");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          errors: ["userId é obrigatório"],
        },
        { status: 400 }
      );
    }

    // Validar se userId é um UUID válido
    const uuidSchema = z.string().uuid();
    const userIdValidation = uuidSchema.safeParse(userId);

    if (!userIdValidation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: ["userId deve ser um UUID válido"],
        },
        { status: 400 }
      );
    }

    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

    // Buscar relatos
    const relatos = await buscarRelatosComValidacao(userId, limit, offset);

    return NextResponse.json({
      success: true,
      data: relatos,
    });
  } catch (error) {
    console.error("Erro ao buscar relatos:", error);
    return NextResponse.json(
      {
        success: false,
        errors: ["Erro interno do servidor"],
      },
      { status: 500 }
    );
  }
}
