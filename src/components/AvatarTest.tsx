"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface AvatarTestProps {
  size?: number;
  showDebug?: boolean;
}

export default function AvatarTest({
  size = 32,
  showDebug = false,
}: AvatarTestProps) {
  const { user } = useAuth();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const avatarUrl = user?.user_metadata?.avatar_url;

  // Reset state when URL changes
  useEffect(() => {
    setImageError(null);
    setImageLoaded(false);
    setRetryCount(0);
  }, [avatarUrl]);

  // Get user initials as fallback
  const getUserInitials = () => {
    if (!user) return "U";

    const fullName = user.user_metadata?.full_name;
    const name = user.user_metadata?.name;
    const email = user.email;

    let displayName = fullName || name;
    if (!displayName && email) {
      displayName = email.split("@")[0];
    }

    if (!displayName) return "U";

    const words = displayName
      .split(" ")
      .filter((word: string) => word.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const errorMessage = `Erro ao carregar imagem (tentativa ${retryCount + 1})`;

    console.error("Avatar image error:", {
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      error: errorMessage,
    });

    setImageError(errorMessage);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(null);
    console.log("Avatar loaded successfully:", avatarUrl);
  };

  const retryImage = () => {
    setRetryCount((prev) => prev + 1);
    setImageError(null);
    setImageLoaded(false);
  };

  // Try to fix common Google avatar URL issues
  const getFixedAvatarUrl = (url: string) => {
    if (!url) return url;

    // If it's a Google avatar URL, ensure it has size parameter
    if (url.includes("googleusercontent.com")) {
      // Remove existing size parameters
      let fixedUrl = url.replace(/[?&]s=\d+/g, "").replace(/[?&]sz=\d+/g, "");

      // Add appropriate size parameter
      const separator = fixedUrl.includes("?") ? "&" : "?";
      return `${fixedUrl}${separator}s=${size * 2}`; // 2x for retina
    }

    return url;
  };

  const shouldShowImage = avatarUrl && !imageError;
  const finalAvatarUrl = avatarUrl ? getFixedAvatarUrl(avatarUrl) : null;

  return (
    <div className="relative">
      {shouldShowImage && finalAvatarUrl ? (
        <img
          key={`${finalAvatarUrl}-${retryCount}`} // Force re-render on retry
          src={finalAvatarUrl}
          alt={`Avatar de ${user?.user_metadata?.full_name || user?.email || "Usuário"}`}
          className={`rounded-full object-cover ring-2 ring-violet-100 hover:ring-violet-200 transition-all`}
          style={{ width: size, height: size }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <div
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-violet-100 hover:ring-violet-200 transition-all"
          style={{ width: size, height: size }}
        >
          <span
            className="text-white font-semibold"
            style={{ fontSize: size * 0.4 }}
          >
            {getUserInitials()}
          </span>
        </div>
      )}

      {showDebug && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-75 text-white text-xs rounded z-50 min-w-max">
          <div>URL: {avatarUrl ? "✅ Presente" : "❌ Ausente"}</div>
          <div>Carregada: {imageLoaded ? "✅ Sim" : "❌ Não"}</div>
          {imageError && <div className="text-red-300">Erro: {imageError}</div>}
          {avatarUrl && (
            <div className="mt-1">
              <button
                onClick={retryImage}
                className="bg-violet-600 text-white px-2 py-1 rounded text-xs hover:bg-violet-700"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
