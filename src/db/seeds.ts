import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

// Conectar com o banco
const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log("🌱 Iniciando seed do Cora.Deep...");

  try {
    await seed(db, schema);

    console.log("✅ Seeds criados com sucesso!");
    console.log("📊 Dados inseridos:");
    console.log("   👤 Usuários realistas");
    console.log("   💭 Relatos emocionais autênticos");
    console.log("   ❤️ Ecos (reações simbólicas)");
    console.log("   📄 Relatórios emocionais personalizados");
  } catch (error) {
    console.error("❌ Erro ao criar seeds:", error);
  } finally {
    await client.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}
