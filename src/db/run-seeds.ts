#!/usr/bin/env tsx

import { runSeeds } from "./seeds";

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.log("🚫 Seeds desabilitados em produção");
    return;
  }

  console.log("🌱 Executando seeds no ambiente de desenvolvimento...");

  try {
    await runSeeds();
    console.log("✅ Seeds executados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao executar seeds:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
