import {
  db,
  users,
  relatos,
  ecos,
  relatorios,
  type NewUser,
  type NewRelato,
  type NewEco,
  type NewRelatorio,
} from "./index";
import { eq, desc, and } from "drizzle-orm";

// ========== USUÁRIOS ==========

export const criarUsuario = async (email: string) => {
  const [user] = await db
    .insert(users)
    .values({
      email,
    })
    .returning();

  return user;
};

export const buscarUsuarioPorEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
};

// ========== RELATOS ==========

export const inserirRelato = async (texto: string, userId: string) => {
  const [relato] = await db
    .insert(relatos)
    .values({
      texto,
      userId,
    })
    .returning();

  return relato;
};

export const buscarRelatosDoUsuario = async (userId: string) => {
  const relatosUsuario = await db
    .select()
    .from(relatos)
    .where(eq(relatos.userId, userId))
    .orderBy(desc(relatos.createdAt));

  return relatosUsuario;
};

export const buscarRelatosComEcos = async (userId?: string) => {
  const query = db
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
    .orderBy(desc(relatos.createdAt));

  if (userId) {
    return await query.where(eq(relatos.userId, userId));
  }

  return await query;
};

// ========== ECOS (Reações Simbólicas) ==========

export const adicionarEco = async (
  relatoId: string,
  tipo: "🌱" | "🫂" | "💧"
) => {
  const [eco] = await db
    .insert(ecos)
    .values({
      relatoId,
      tipo,
    })
    .returning();

  return eco;
};

export const contarEcosPorRelato = async (relatoId: string) => {
  const ecosRelato = await db
    .select()
    .from(ecos)
    .where(eq(ecos.relatoId, relatoId));

  // Contar por tipo
  const contadores = {
    "🌱": 0,
    "🫂": 0,
    "💧": 0,
  };

  ecosRelato.forEach((eco) => {
    contadores[eco.tipo]++;
  });

  return contadores;
};

// ========== RELATÓRIOS ==========

export const criarRelatorio = async (
  userId: string,
  conteudo: string,
  tipo: "basico" | "profundo" | "renascimento"
) => {
  const [relatorio] = await db
    .insert(relatorios)
    .values({
      userId,
      conteudo,
      tipo,
    })
    .returning();

  return relatorio;
};

export const buscarRelatoriosDoUsuario = async (userId: string) => {
  const relatoriosUsuario = await db
    .select()
    .from(relatorios)
    .where(eq(relatorios.userId, userId))
    .orderBy(desc(relatorios.createdAt));

  return relatoriosUsuario;
};

export const buscarUltimoRelatorio = async (
  userId: string,
  tipo?: "basico" | "profundo" | "renascimento"
) => {
  if (tipo) {
    const [ultimoRelatorio] = await db
      .select()
      .from(relatorios)
      .where(and(eq(relatorios.userId, userId), eq(relatorios.tipo, tipo)))
      .orderBy(desc(relatorios.createdAt))
      .limit(1);
    return ultimoRelatorio;
  }

  const [ultimoRelatorio] = await db
    .select()
    .from(relatorios)
    .where(eq(relatorios.userId, userId))
    .orderBy(desc(relatorios.createdAt))
    .limit(1);

  return ultimoRelatorio;
};

// ========== QUERIES COMPLEXAS ==========

export const obterDashboardUsuario = async (userId: string) => {
  // Buscar dados do usuário
  const usuario = await db.select().from(users).where(eq(users.id, userId));

  // Contar relatos
  const totalRelatos = await db
    .select()
    .from(relatos)
    .where(eq(relatos.userId, userId));

  // Buscar último relatório
  const ultimoRelatorio = await buscarUltimoRelatorio(userId);

  // Buscar relatos recentes com ecos
  const relatosRecentes = await db
    .select({
      relato: relatos,
      ecos: ecos,
    })
    .from(relatos)
    .leftJoin(ecos, eq(relatos.id, ecos.relatoId))
    .where(eq(relatos.userId, userId))
    .orderBy(desc(relatos.createdAt))
    .limit(5);

  return {
    usuario: usuario[0],
    totalRelatos: totalRelatos.length,
    ultimoRelatorio,
    relatosRecentes,
  };
};
