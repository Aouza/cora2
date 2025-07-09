import { reset, seed } from "drizzle-seed";
import { db, client } from "./index";
import * as schema from "./schema";
import { seedConfig } from "./seed-data";

async function main() {
  console.log("🌱 Iniciando seed estruturado do Cora.Deep...");

  try {
    // 1. Reset do banco usando drizzle-seed
    console.log("🔄 Resetando banco de dados...");
    await reset(db, schema);
    console.log("✅ Dados limpos com sucesso!");

    // 2. Seed com dados estruturados
    console.log("📊 Inserindo dados estruturados...");
    await seed(db, schema).refine((f) => {
      return {
        profiles: {
          count: seedConfig.profiles.count,
          columns: {
            id: f.uuid(),
            email: f.valuesFromArray({
              values: seedConfig.profiles.data.emails,
            }),
            full_name: f.valuesFromArray({
              values: seedConfig.profiles.data.names,
            }),
            avatar_url: f.default({ defaultValue: null }),
            created_at: f.date(),
            updated_at: f.date(),
          },
        },

        relatos: {
          count: seedConfig.relatos.count,
          columns: {
            id: f.uuid(),
            texto: f.valuesFromArray({
              values: seedConfig.relatos.data.textos,
            }),
            user_id: f.uuid(), // Será linkado automaticamente
            created_at: f.date(),
            updated_at: f.date(),
          },
        },

        ecos: {
          count: seedConfig.ecos.count,
          columns: {
            id: f.uuid(),
            tipo: f.valuesFromArray({ values: seedConfig.ecos.data.tipos }),
            relato_id: f.uuid(), // Será linkado automaticamente
            created_at: f.date(),
          },
        },

        relatorios: {
          count: seedConfig.relatorios.count,
          columns: {
            id: f.uuid(),
            conteudo: f.json(),
            user_id: f.uuid(), // Será linkado automaticamente
            created_at: f.date(),
            updated_at: f.date(),
          },
        },
      };
    });

    console.log("✅ Seeds criados com sucesso!");
    console.log("📊 Dados inseridos:");
    console.log(`   👤 ${seedConfig.profiles.count} usuários`);
    console.log(`   💭 ${seedConfig.relatos.count} relatos`);
    console.log(`   ❤️ ${seedConfig.ecos.count} ecos`);
    console.log(`   📄 ${seedConfig.relatorios.count} relatórios`);
  } catch (error) {
    console.error("❌ Erro ao criar seeds:", error);
    throw error;
  } finally {
    // 3. Finalizar conexão
    await client.end();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { main as runSeeds };
