import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  relationshipFormSchema,
  type RelationshipFormData,
} from "../../db/form-schemas";

interface UseRelationshipFormOptions {
  onSubmit?: (data: RelationshipFormData) => void | Promise<void>;
  defaultValues?: Partial<RelationshipFormData>;
}

export const useRelationshipForm = (
  options: UseRelationshipFormOptions = {}
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
  } = useForm<RelationshipFormData>({
    resolver: zodResolver(relationshipFormSchema),
    mode: "onChange",
    defaultValues: {
      name1: "",
      email1: "",
      birthdate1: "",
      name2: "",
      birthdate2: "",
      gender1: undefined,
      relationshipStatus: undefined,
      ...options.defaultValues,
    },
  });

  const watchedFields = watch();

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormComplete = Object.values(watchedFields).every(
    (value) => value && value.toString().trim() !== ""
  );

  // Verificar se campos específicos foram tocados
  const hasUserDataErrors = !!(
    errors.name1 ||
    errors.email1 ||
    errors.birthdate1 ||
    errors.gender1
  );
  const hasPartnerDataErrors = !!(errors.name2 || errors.birthdate2);
  const hasRelationshipStatusError = !!errors.relationshipStatus;

  // Verificar progresso do formulário
  const getFormProgress = () => {
    const totalFields = 7;
    const filledFields = Object.values(watchedFields).filter(
      (value) => value && value.toString().trim() !== ""
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  // Validar idade específica
  const validateAge = (dateString: string) => {
    if (!dateString) return false;

    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 16 && age - 1 <= 100;
    }

    return age >= 16 && age <= 100;
  };

  // Submissão do formulário
  const onFormSubmit = handleSubmit(async (data) => {
    try {
      if (options.onSubmit) {
        await options.onSubmit(data);
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      throw error;
    }
  });

  // Limpar formulário
  const resetForm = () => {
    reset({
      name1: "",
      email1: "",
      birthdate1: "",
      name2: "",
      birthdate2: "",
      gender1: undefined,
      relationshipStatus: undefined,
    });
  };

  // Salvar dados no localStorage (sem violar regras do projeto)
  const saveFormProgress = () => {
    // Nota: Como o projeto não permite localStorage,
    // esta função pode ser adaptada para usar react-query cache
    console.log("Form progress saved:", watchedFields);
  };

  // Pré-validação de campos específicos
  const preValidateField = (
    fieldName: keyof RelationshipFormData,
    value: string
  ) => {
    try {
      const testData = { [fieldName]: value } as Partial<RelationshipFormData>;
      relationshipFormSchema.partial().parse(testData);
      return { isValid: true, error: null };
    } catch (error: any) {
      return {
        isValid: false,
        error: error.errors?.[0]?.message || "Campo inválido",
      };
    }
  };

  return {
    // React Hook Form methods
    register,
    handleSubmit: onFormSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,

    // Custom computed values
    watchedFields,
    isFormComplete,
    hasUserDataErrors,
    hasPartnerDataErrors,
    hasRelationshipStatusError,

    // Custom methods
    getFormProgress,
    validateAge,
    resetForm,
    saveFormProgress,
    preValidateField,

    // Form state helpers
    isReadyToSubmit: isFormComplete && isValid && !isSubmitting,
    formProgress: getFormProgress(),
  };
};

// Hook específico para validação em tempo real
export const useRelationshipFormValidation = () => {
  // Validações específicas que podem ser reutilizadas
  const validateBrazilianName = (name: string): boolean => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  };

  const validateEmailDomain = (email: string): boolean => {
    const commonDomains = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
      "uol.com.br",
      "bol.com.br",
      "terra.com.br",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return commonDomains.includes(domain) || email.includes(".");
  };

  const getAgeFromDate = (dateString: string): number => {
    if (!dateString) return 0;

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

    return age;
  };

  const getCompatibilityHint = (
    gender1?: string,
    age1?: number,
    age2?: number,
    status?: string
  ): string => {
    if (!age1 || !age2) return "";

    const ageDiff = Math.abs(age1 - age2);

    if (ageDiff <= 2) return "Idades muito próximas podem facilitar a conexão";
    if (ageDiff <= 5) return "Diferença de idade ideal para relacionamentos";
    if (ageDiff <= 10) return "Diferença de idade moderada";
    return "Grande diferença de idade pode trazer desafios únicos";
  };

  return {
    validateBrazilianName,
    validateEmailDomain,
    getAgeFromDate,
    getCompatibilityHint,
  };
};
