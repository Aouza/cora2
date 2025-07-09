import { shouldRunSeeds } from "./config";

async function simpleSeed() {
  if (!shouldRunSeeds()) {
    console.log("🚫 Seeds desabilitados para ambiente de produção");
    return;
  }

  console.log("🌱 Criando seeds simples para o Cora.Deep...");

  // TODO: Implementar seeds quando necessário
  // Por enquanto, só um log para desenvolvimento

  console.log("\n🎉 Seeds simples concluídos com sucesso!");
}

// Só executa se for chamado diretamente
if (require.main === module) {
  simpleSeed().catch((error) => {
    console.error("❌ Erro ao criar seeds:", error);
    process.exit(1);
  });
}

export { simpleSeed };
