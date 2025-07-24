import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Obter o arquivo do FormData
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Apenas arquivos de imagem são permitidos" },
        { status: 400 }
      );
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 5MB." },
        { status: 400 }
      );
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

    // Upload para Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Erro no upload:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem" },
        { status: 500 }
      );
    }

    // Gerar URL pública
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return NextResponse.json({
      avatarUrl: urlData.publicUrl,
      message: "Avatar enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro no upload de avatar:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
