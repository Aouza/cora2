"use client";

import { useState } from "react";

interface AvatarProps {
  user: any;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({
  user,
  size = "md",
  className = "",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-sm";
      case "lg":
        return "w-16 h-16 text-lg";
      default:
        return "w-12 h-12 text-base";
    }
  };

  const getInitials = (user: any) => {
    if (!user) return "U";
    const name =
      user.user_metadata?.full_name || user.user_metadata?.name || user.email;
    if (!name) return "U";

    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = getInitials(user);
  const baseClasses = `${getSizeClasses()} rounded-full ${className}`;

  // Se tem URL e não deu erro, tenta mostrar a imagem
  if (avatarUrl && !imageError) {
    return (
      <img
        src={avatarUrl}
        alt={`Avatar de ${user?.user_metadata?.full_name || user?.email}`}
        className={`${baseClasses} object-cover border-2 border-violet-200`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback para iniciais
  return (
    <div
      className={`${baseClasses} bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium`}
    >
      {initials}
    </div>
  );
}
