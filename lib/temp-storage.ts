// Sistema simples de armazenamento temporário em memória
// Em produção, use Redis ou banco de dados

interface UserData {
  userName: string;
  userEmail: string;
  userBirthdate?: string;
  userGender?: string;
  otherName: string;
  otherBirthdate?: string;
  relationshipStatus?: string;
  report?: string; // Agora opcional, pois será gerado após pagamento
}

// Map temporário para armazenar dados dos usuários
const tempStorage = new Map<string, UserData>();

export const storeTempUserData = (
  sessionId: string,
  userData: UserData
): void => {
  tempStorage.set(sessionId, userData);

  // Limpar dados após 30 minutos (por segurança)
  setTimeout(
    () => {
      tempStorage.delete(sessionId);
    },
    30 * 60 * 1000
  ); // 30 minutos
};

export const getTempUserData = (sessionId: string): UserData | null => {
  return tempStorage.get(sessionId) || null;
};

export const deleteTempUserData = (sessionId: string): void => {
  tempStorage.delete(sessionId);
};
