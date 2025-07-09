import { z } from "zod";

// ========== VALIDAÇÕES BÁSICAS ==========

// Schema para UUID
export const uuidSchema = z.string().uuid("ID deve ser um UUID válido");

// Schema para email
export const emailSchema = z.string().email("Email deve ter formato válido");

// ========== SCHEMAS DOS MODELOS ==========

// Schema para criação de usuário
export const createUserSchema = z.object({
  email: emailSchema,
});

// Schema para atualização de usuário
export const updateUserSchema = z.object({
  email: emailSchema.optional(),
});

// Schema para criação de relato
export const createRelatoSchema = z.object({
  texto: z
    .string()
    .min(10, "Relato deve ter pelo menos 10 caracteres")
    .max(500, "Relato deve ter no máximo 500 caracteres")
    .refine((text) => text.trim().length > 0, "Relato não pode estar vazio"),
  userId: uuidSchema,
});

// Schema para atualização de relato
export const updateRelatoSchema = z.object({
  texto: z
    .string()
    .min(10, "Relato deve ter pelo menos 10 caracteres")
    .max(500, "Relato deve ter no máximo 500 caracteres")
    .optional(),
});

// Schema para criação de eco
export const createEcoSchema = z.object({
  relatoId: uuidSchema,
  tipo: z.enum(["🌱", "🫂", "💧"], {
    errorMap: () => ({ message: "Tipo de eco deve ser 🌱, 🫂 ou 💧" }),
  }),
});

// Schema para criação de relatório
export const createRelatorioSchema = z.object({
  userId: uuidSchema,
  conteudo: z
    .string()
    .min(50, "Relatório deve ter pelo menos 50 caracteres")
    .max(5000, "Relatório deve ter no máximo 5000 caracteres"),
  tipo: z.enum(["basico", "profundo", "renascimento"], {
    errorMap: () => ({
      message: "Tipo deve ser: basico, profundo ou renascimento",
    }),
  }),
});

// ========== SCHEMAS PARA API ROUTES ==========

// Schema para buscar relatos de usuário
export const getRelatosQuerySchema = z.object({
  userId: uuidSchema,
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1 && val <= 100, "Limite deve ser entre 1 e 100")
    .optional()
    .default("10"),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, "Offset deve ser maior que 0")
    .optional()
    .default("0"),
});

// Schema para filtros de relatório
export const getRelatoriosQuerySchema = z.object({
  userId: uuidSchema,
  tipo: z.enum(["basico", "profundo", "renascimento"]).optional(),
});

// ========== SCHEMAS COMPOSTOS ==========

// Schema para criação de relato com validações extras
export const createRelatoWithValidationSchema = createRelatoSchema.extend({
  texto: z
    .string()
    .min(10, "Relato deve ter pelo menos 10 caracteres")
    .max(500, "Relato deve ter no máximo 500 caracteres")
    .refine((text) => {
      // Verificar se não é só espaços
      if (text.trim().length === 0) return false;

      // Verificar se não é muito repetitivo
      const words = text.split(" ");
      const uniqueWords = new Set(words);
      if (uniqueWords.size < words.length * 0.3) return false;

      return true;
    }, "Relato deve ter conteúdo mais diversificado")
    .refine((text) => {
      // Verificar profanidade básica (pode expandir)
      const badWords = ["spam", "teste123", "asdasd"];
      return !badWords.some((word) => text.toLowerCase().includes(word));
    }, "Relato contém conteúdo inadequado"),
});

// Schema para dados do dashboard
export const dashboardQuerySchema = z.object({
  userId: uuidSchema,
  includeRecentRelatos: z.boolean().optional().default(true),
  includeRelatorios: z.boolean().optional().default(true),
});

// ========== TIPOS INFERIDOS ==========

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateRelatoInput = z.infer<typeof createRelatoSchema>;
export type UpdateRelatoInput = z.infer<typeof updateRelatoSchema>;
export type CreateEcoInput = z.infer<typeof createEcoSchema>;
export type CreateRelatorioInput = z.infer<typeof createRelatorioSchema>;
export type GetRelatosQuery = z.infer<typeof getRelatosQuerySchema>;
export type GetRelatoriosQuery = z.infer<typeof getRelatoriosQuerySchema>;
export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;

// ========== UTILITÁRIOS DE VALIDAÇÃO ==========

// Função helper para validar dados
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(`Dados inválidos: ${messages.join(", ")}`);
    }
    throw error;
  }
};

// Função para validação segura (retorna resultado)
export const safeValidateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map(
    (err) => `${err.path.join(".")}: ${err.message}`
  );
  return { success: false, errors };
};

// ========== SCHEMAS PARA FORMS ==========

// Schema para formulário de novo relato (frontend)
export const relatoFormSchema = z.object({
  texto: z
    .string()
    .min(10, "Compartilhe pelo menos 10 caracteres do seu sentimento")
    .max(500, "Tente resumir em até 500 caracteres")
    .refine(
      (text) => text.trim().length > 0,
      "Escreva algo sobre o que está sentindo"
    ),
});

// Schema para configurações de usuário
export const userSettingsSchema = z.object({
  notifications: z.boolean().default(true),
  privacy: z.enum(["public", "anonymous", "private"]).default("anonymous"),
  language: z.enum(["pt", "en", "es"]).default("pt"),
});

export type RelatoFormInput = z.infer<typeof relatoFormSchema>;
export type UserSettingsInput = z.infer<typeof userSettingsSchema>;
