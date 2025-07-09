import { eq, desc, and } from "drizzle-orm";
import { db } from "./index";
import { users, relatos, ecos, relatorios } from "./schema";
import { z } from "zod";
import {
  createUserSchema,
  createRelatoSchema,
  createEcoSchema,
  createRelatorioSchema,
} from "./validations";

// ========== FUNÇÕES DE VALIDAÇÃO ==========

// Validação estrita que lança erro
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

// Validação segura que retorna resultado
export const safeValidateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const errors = result.error.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`
    );
    return { success: false, errors };
  }
};

// ========== USUÁRIOS COM VALIDAÇÃO ==========

export const criarUsuarioValidado = async (data: unknown) => {
  const validData = validateData(createUserSchema, data);

  // Verificar se email já existe
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, validData.email));

  if (existingUser.length > 0) {
    throw new Error("Email já está em uso");
  }

  const [user] = await db.insert(users).values(validData).returning();
  return user;
};

export const criarUsuarioSeguro = async (data: unknown) => {
  const validation = safeValidateData(createUserSchema, data);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    // Verificar se email já existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validation.data.email));

    if (existingUser.length > 0) {
      return { success: false, errors: ["Email já está em uso"] };
    }

    const [user] = await db.insert(users).values(validation.data).returning();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, errors: ["Erro ao criar usuário"] };
  }
};

// ========== RELATOS COM VALIDAÇÃO ==========

export const inserirRelatoValidado = async (data: unknown) => {
  const validData = validateData(createRelatoSchema, data);

  // Verificar se usuário existe
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.id, validData.userId));
  if (userExists.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  const [relato] = await db.insert(relatos).values(validData).returning();
  return relato;
};

export const inserirRelatoSeguro = async (data: unknown) => {
  const validation = safeValidateData(createRelatoSchema, data);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    // Verificar se usuário existe
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.id, validation.data.userId));
    if (userExists.length === 0) {
      return { success: false, errors: ["Usuário não encontrado"] };
    }

    // Rate limiting: verificar quantos relatos recentes
    const recentRelatos = await db
      .select()
      .from(relatos)
      .where(
        and(
          eq(relatos.userId, validation.data.userId)
          // Note: Você pode adicionar filtro de data aqui se tiver campo timestamp
        )
      );

    if (recentRelatos.length >= 10) {
      return {
        success: false,
        errors: ["Muitos relatos recentes. Tente novamente mais tarde."],
      };
    }

    const [relato] = await db
      .insert(relatos)
      .values({
        texto: validation.data.texto,
        userId: validation.data.userId,
      })
      .returning();

    return { success: true, data: relato };
  } catch (error) {
    return { success: false, errors: ["Erro ao salvar relato"] };
  }
};

// ========== ECOS COM VALIDAÇÃO ==========

export const adicionarEcoValidado = async (data: unknown) => {
  const validData = validateData(createEcoSchema, data);

  // Verificar se relato existe
  const relatoExists = await db
    .select()
    .from(relatos)
    .where(eq(relatos.id, validData.relatoId));
  if (relatoExists.length === 0) {
    throw new Error("Relato não encontrado");
  }

  const [eco] = await db.insert(ecos).values(validData).returning();
  return eco;
};

export const adicionarEcoSeguro = async (data: unknown) => {
  const validation = safeValidateData(createEcoSchema, data);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  try {
    // Verificar se relato existe
    const relatoExists = await db
      .select()
      .from(relatos)
      .where(eq(relatos.id, validation.data.relatoId));
    if (relatoExists.length === 0) {
      return { success: false, errors: ["Relato não encontrado"] };
    }

    // Rate limiting: máximo 10 ecos por minuto por IP (implementar em API route)
    const [eco] = await db.insert(ecos).values(validation.data).returning();
    return { success: true, data: eco };
  } catch (error) {
    return { success: false, errors: ["Erro ao adicionar eco"] };
  }
};

// ========== RELATÓRIOS COM VALIDAÇÃO ==========

export const criarRelatorioValidado = async (data: unknown) => {
  const validData = validateData(createRelatorioSchema, data);

  // Verificar se usuário existe
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.id, validData.userId));
  if (userExists.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  const [relatorio] = await db.insert(relatorios).values(validData).returning();
  return relatorio;
};

// ========== QUERIES SEGURAS ==========

export const buscarRelatosComValidacao = async (
  userId: string,
  limit = 10,
  offset = 0
) => {
  // Validar parâmetros
  const validation = safeValidateData(
    z.object({
      userId: z.string().uuid(),
    }),
    { userId }
  );

  if (!validation.success) {
    throw new Error("ID de usuário inválido");
  }

  return await db
    .select({
      relato: relatos,
      user: {
        id: users.id,
        email: users.email,
      },
      ecos: ecos,
    })
    .from(relatos)
    .leftJoin(users, eq(relatos.userId, users.id))
    .leftJoin(ecos, eq(relatos.id, ecos.relatoId))
    .where(eq(relatos.userId, userId))
    .orderBy(desc(relatos.createdAt))
    .limit(Math.min(limit, 50)) // Máximo 50 resultados
    .offset(offset);
};

// ========== EXEMPLO DE USO SEGURO ==========

export const exemploValidacao = async () => {
  console.log("🛡️ Exemplos de validação com Zod");

  try {
    // Exemplo 1: Criar usuário com validação
    const resultadoUsuario = await criarUsuarioSeguro({
      email: "teste@validacao.com",
    });

    if (resultadoUsuario.success && resultadoUsuario.data) {
      console.log("✅ Usuário criado:", resultadoUsuario.data.email);

      // Exemplo 2: Tentar relato inválido
      const relatoInvalido = await inserirRelatoSeguro({
        texto: "abc", // Muito curto
        userId: resultadoUsuario.data.id,
      });

      if (!relatoInvalido.success) {
        console.log("❌ Relato rejeitado:", relatoInvalido.errors);
      }

      // Exemplo 3: Relato válido
      const relatoValido = await inserirRelatoSeguro({
        texto:
          "Este é um relato válido sobre meus sentimentos de hoje, com mais de 10 caracteres.",
        userId: resultadoUsuario.data.id,
      });

      if (relatoValido.success && relatoValido.data) {
        console.log(
          "✅ Relato criado:",
          relatoValido.data.texto.substring(0, 50) + "..."
        );

        // Exemplo 4: Adicionar eco
        const ecoResult = await adicionarEcoSeguro({
          relatoId: relatoValido.data.id,
          tipo: "🌱",
        });

        if (ecoResult.success && ecoResult.data) {
          console.log("✅ Eco adicionado:", ecoResult.data.tipo);
        }
      }
    } else {
      console.log("❌ Erro ao criar usuário:", resultadoUsuario.errors);
    }
  } catch (error) {
    console.error("❌ Erro no exemplo:", error);
  }
};

// ========== MIDDLEWARES PARA API ROUTES ==========

export const validateMiddleware = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): T => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        throw new Error(`Validação falhou: ${messages}`);
      }
      throw error;
    }
  };
};
