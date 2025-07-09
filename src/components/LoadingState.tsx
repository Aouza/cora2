interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingState({
  message = "Carregando...",
  size = "md",
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-violet-600 ${sizeClasses[size]} mb-4`}
      ></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
