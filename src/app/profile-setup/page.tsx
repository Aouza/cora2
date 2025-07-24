"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Camera,
  Upload,
  Heart,
  ArrowRight,
  Sparkles,
  Shield,
  Eye,
} from "lucide-react";
import Avatar from "@/components/Avatar";

// Schema de validação para o setup de perfil
const profileSetupSchema = z.object({
  nickname: z
    .string()
    .min(2, "Apelido deve ter pelo menos 2 caracteres")
    .max(30, "Apelido deve ter no máximo 30 caracteres")
    .regex(
      /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/,
      "Apelido pode conter apenas letras, números, espaços, hífens e underscores"
    ),
  useCustomAvatar: z.boolean(),
});

type ProfileSetupData = z.infer<typeof profileSetupSchema>;

export default function ProfileSetup() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [useCustomAvatar, setUseCustomAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ProfileSetupData>({
    resolver: zodResolver(profileSetupSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      useCustomAvatar: false,
    },
  });

  // Se não estiver logado, redirecionar
  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 mb-8 text-violet-600 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Carregando...
          </h1>
        </div>
      </div>
    );
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo e tamanho
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("A imagem deve ter menos de 5MB.");
        return;
      }

      setAvatarFile(file);
      setUseCustomAvatar(true);

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setUseCustomAvatar(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: ProfileSetupData) => {
    setIsSubmitting(true);

    try {
      // Preparar dados do perfil
      const profileData: any = {
        nickname: data.nickname,
        useCustomAvatar: data.useCustomAvatar,
        profileCompleted: true,
      };

      // Se tem arquivo de avatar, fazer upload primeiro
      if (avatarFile && data.useCustomAvatar) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadResponse = await fetch("/api/profiles/upload-avatar", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const { avatarUrl } = await uploadResponse.json();
          profileData.customAvatarUrl = avatarUrl;
        }
      }

      // Atualizar perfil
      const response = await fetch("/api/profiles/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Redirecionar para dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro no setup de perfil:", error);
      alert("Erro ao configurar perfil. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedFields = watch();
  const isFormValid = isValid && watchedFields.nickname.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configure seu Perfil
          </h1>
          <p className="text-gray-600">
            Personalize sua experiência no Cora.Deep
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Seção: Avatar */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-violet-600" />
                Foto do Perfil
              </h2>

              <div className="flex flex-col items-center space-y-4">
                {/* Avatar Preview */}
                <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-violet-200"
                    />
                  ) : (
                    <Avatar user={user} size="lg" showDebug={false} />
                  )}

                  {/* Botão de upload */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Input file hidden */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />

                {/* Opções de avatar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setUseCustomAvatar(false)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      !useCustomAvatar
                        ? "bg-violet-100 border-violet-300 text-violet-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Usar Avatar Padrão
                  </button>

                  {avatarFile && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Remover Foto
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 text-center">
                  {avatarFile
                    ? "Foto personalizada selecionada"
                    : "Use sua foto do Google ou faça upload de uma nova"}
                </p>
              </div>
            </div>

            {/* Seção: Nome/Apelido */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-violet-600" />
                Como quer ser chamado?
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apelido ou Nome de Exibição
                </label>
                <input
                  {...register("nickname")}
                  type="text"
                  placeholder="Ex: Ana, João, CoraUser123"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    errors.nickname
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.nickname && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nickname.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Este será o nome que aparecerá no Mural Vivo
                </p>
              </div>
            </div>

            {/* Seção: Privacidade */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-violet-600" />
                Configurações de Privacidade
              </h2>

              <div className="bg-violet-50 p-4 rounded-lg">
                <p className="text-sm text-violet-800">
                  <strong>Modo Anônimo Ativo:</strong> Seu perfil será exibido
                  de forma anônima no Mural Vivo, mostrando apenas seu apelido.
                  Você pode alterar essa configuração posteriormente.
                </p>
              </div>
            </div>

            {/* Botão de Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-violet-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Configurando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Começar a Usar Cora.Deep
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Você pode alterar essas configurações a qualquer momento no seu
            perfil
          </p>
        </div>
      </div>
    </div>
  );
}
