"use client";

import { useState } from "react";
import { relatoFormSchema, type RelatoFormInput } from "../../db/validations";
import { safeValidateData } from "../../db/validations";

interface UseRelatoFormProps {
  onSubmit: (data: RelatoFormInput) => Promise<void>;
  onSuccess?: () => void;
  onError?: (errors: string[]) => void;
}

export function useRelatoForm({
  onSubmit,
  onSuccess,
  onError,
}: UseRelatoFormProps) {
  const [formData, setFormData] = useState<RelatoFormInput>({
    texto: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof RelatoFormInput, value: string) => {
    const validation = safeValidateData(
      relatoFormSchema.pick({ [name]: true }),
      { [name]: value }
    );

    if (!validation.success) {
      setErrors((prev) => [
        ...prev.filter((error) => !error.startsWith(`${name}:`)),
        ...validation.errors,
      ]);
      return false;
    } else {
      setErrors((prev) =>
        prev.filter((error) => !error.startsWith(`${name}:`))
      );
      return true;
    }
  };

  const handleChange = (name: keyof RelatoFormInput, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validação em tempo real (debounced)
    if (value.length > 0) {
      setTimeout(() => validateField(name, value), 500);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Validação completa
      const validation = safeValidateData(relatoFormSchema, formData);

      if (!validation.success) {
        setErrors(validation.errors);
        onError?.(validation.errors);
        return;
      }

      // Submeter dados
      await onSubmit(validation.data);

      // Reset form
      setFormData({ texto: "" });
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setErrors([errorMessage]);
      onError?.([errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    formData.texto.length >= 10 && !isSubmitting && errors.length === 0;

  return {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleChange,
    handleSubmit,
    setErrors,
    // Helpers
    getFieldError: (field: keyof RelatoFormInput) =>
      errors
        .find((error) => error.startsWith(`${field}:`))
        ?.replace(`${field}:`, "")
        .trim(),
    hasFieldError: (field: keyof RelatoFormInput) =>
      errors.some((error) => error.startsWith(`${field}:`)),
    clearErrors: () => setErrors([]),
    // Contadores
    characterCount: formData.texto.length,
    remainingCharacters: 500 - formData.texto.length,
    isNearLimit: 500 - formData.texto.length < 50,
  };
}
