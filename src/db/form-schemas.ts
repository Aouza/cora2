import { z } from "zod";

// ========== SCHEMAS PARA FORMULÁRIOS ==========

// Schema para o formulário de relacionamento (substitui Yup)
export const relationshipFormSchema = z.object({
  name1: z
    .string()
    .min(2, "Seu nome deve ter pelo menos 2 caracteres")
    .max(50, "Seu nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  email1: z
    .string()
    .email("Digite um email válido")
    .max(100, "Email muito longo"),

  birthdate1: z
    .string()
    .min(1, "Sua data de nascimento é obrigatória")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 16 && age <= 100;
    }, "Você deve ter entre 16 e 100 anos"),

  name2: z
    .string()
    .min(2, "O nome da outra pessoa deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  birthdate2: z
    .string()
    .min(1, "A data de nascimento da outra pessoa é obrigatória")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 16 && age <= 100;
    }, "A pessoa deve ter entre 16 e 100 anos"),

  gender1: z.enum(["masculino", "feminino", "outro"], {
    errorMap: () => ({ message: "Selecione seu gênero" }),
  }),

  relationshipStatus: z.enum(["namorando", "casado", "separados", "outros"], {
    errorMap: () => ({ message: "Selecione o status do relacionamento" }),
  }),
});

// Schema para relato simples (Mural Vivo)
export const muraVivRelatoSchema = z.object({
  texto: z
    .string()
    .min(10, "Compartilhe pelo menos 10 caracteres do seu sentimento")
    .max(500, "Tente resumir em até 500 caracteres")
    .refine(
      (text) => text.trim().length > 0,
      "Escreva algo sobre o que está sentindo"
    )
    .refine((text) => {
      // Verificar se não é muito repetitivo
      const words = text.split(" ");
      const uniqueWords = new Set(words);
      return uniqueWords.size >= Math.min(words.length * 0.4, 3);
    }, "Tente variar mais as palavras no seu relato"),
});

// Schema para configurações de usuário
export const userConfigSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false),
    weekly_summary: z.boolean().default(true),
  }),
  privacy: z.object({
    profile_visibility: z
      .enum(["public", "anonymous", "private"])
      .default("anonymous"),
    share_insights: z.boolean().default(false),
    allow_connections: z.boolean().default(true),
  }),
  preferences: z.object({
    language: z.enum(["pt", "en", "es"]).default("pt"),
    theme: z.enum(["light", "dark", "auto"]).default("auto"),
    timezone: z.string().default("America/Sao_Paulo"),
  }),
});

// Schema para feedback
export const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "improvement", "general"], {
    errorMap: () => ({ message: "Selecione o tipo de feedback" }),
  }),
  title: z
    .string()
    .min(5, "Título deve ter pelo menos 5 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(20, "Descreva com pelo menos 20 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  email: z.string().email("Email inválido").optional(),
  rating: z
    .number()
    .min(1, "Avalie de 1 a 5")
    .max(5, "Avalie de 1 a 5")
    .optional(),
});

// Schema para contato/suporte
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Digite um email válido"),
  subject: z
    .string()
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(100, "Assunto deve ter no máximo 100 caracteres"),
  message: z
    .string()
    .min(20, "Mensagem deve ter pelo menos 20 caracteres")
    .max(2000, "Mensagem deve ter no máximo 2000 caracteres"),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

// ========== TIPOS INFERIDOS ==========

export type RelationshipFormData = z.infer<typeof relationshipFormSchema>;
export type MuralVivoRelatoData = z.infer<typeof muraVivRelatoSchema>;
export type UserConfigData = z.infer<typeof userConfigSchema>;
export type FeedbackData = z.infer<typeof feedbackSchema>;
export type ContactData = z.infer<typeof contactSchema>;

// ========== VALIDAÇÕES CUSTOMIZADAS ==========

// Validação de idade personalizada
export const validateAge = (dateString: string, minAge = 16, maxAge = 100) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= minAge && age <= maxAge;
};

// Validação de nome brasileiro
export const validateBrazilianName = (name: string) => {
  // Aceita letras, acentos, espaços, hífen e apóstrofe
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

// Validação de conteúdo apropriado
export const validateAppropriateContent = (text: string) => {
  const inappropriateWords = [
    "spam",
    "teste123",
    "asdasd",
    "qwerty",
    // Adicionar mais conforme necessário
  ];

  const lowerText = text.toLowerCase();
  return !inappropriateWords.some((word) => lowerText.includes(word));
};

// ========== HELPERS PARA REACT HOOK FORM ==========

// Função para converter erros Zod em formato do React Hook Form
export const formatZodErrors = (error: z.ZodError) => {
  const errors: Record<string, { message: string }> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = { message: err.message };
  });

  return errors;
};

// Validação assíncrona de email único (para usar em forms)
export const validateUniqueEmail = async (email: string): Promise<boolean> => {
  try {
    // Aqui você faria uma consulta ao banco
    // Por enquanto, simular verificação
    const response = await fetch(`/api/users/check-email?email=${email}`);
    const result = await response.json();
    return !result.exists;
  } catch {
    return true; // Em caso de erro, permitir (será validado no backend)
  }
};
