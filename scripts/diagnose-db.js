#!/usr/bin/env node

/**
 * Script de diagnóstico para problemas de conexão com Supabase
 * Uso: node scripts/diagnose-db.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Diagnóstico de Conexão com Supabase\n");

// 1. Verificar variáveis de ambiente
console.log("1️⃣ Verificando variáveis de ambiente...");
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const hasDatabaseUrl = envContent.includes("DATABASE_URL");
  const hasSupabaseUrl = envContent.includes("NEXT_PUBLIC_SUPABASE_URL");
  const hasSupabaseKey = envContent.includes("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  console.log(
    `   ✅ DATABASE_URL: ${hasDatabaseUrl ? "Configurado" : "❌ Faltando"}`
  );
  console.log(
    `   ✅ SUPABASE_URL: ${hasSupabaseUrl ? "Configurado" : "❌ Faltando"}`
  );
  console.log(
    `   ✅ SUPABASE_KEY: ${hasSupabaseKey ? "Configurado" : "❌ Faltando"}`
  );
} else {
  console.log("   ❌ Arquivo .env.local não encontrado");
}

// 2. Verificar formato da DATABASE_URL
console.log("\n2️⃣ Verificando formato da DATABASE_URL...");
const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl) {
  console.log(`   📍 URL encontrada: ${databaseUrl.substring(0, 50)}...`);

  const isPooling = databaseUrl.includes("pooler.supabase.com");
  const isDirect = databaseUrl.includes("supabase.co:5432");
  const isCloudflare =
    databaseUrl.includes("104.18.") || databaseUrl.includes("172.64.");

  console.log(
    `   🔗 Connection Pooling: ${isPooling ? "✅ Ativo" : "❌ Não ativo"}`
  );
  console.log(`   🔗 Conexão Direta: ${isDirect ? "✅ Sim" : "❌ Não"}`);
  console.log(
    `   🔗 Via Cloudflare: ${isCloudflare ? "⚠️ Sim (pode causar problemas)" : "✅ Não"}`
  );

  if (isCloudflare) {
    console.log(
      "\n   🚨 RECOMENDAÇÃO: Use connection pooling para evitar problemas com Cloudflare"
    );
    console.log(
      "   📝 Formato recomendado: postgresql://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
    );
  }
} else {
  console.log("   ❌ DATABASE_URL não configurada");
}

// 3. Testar conectividade de rede
console.log("\n3️⃣ Testando conectividade de rede...");
try {
  const pingResult = execSync("ping -c 3 supabase.com", { encoding: "utf8" });
  console.log("   ✅ Conectividade com Supabase.com: OK");
} catch (error) {
  console.log("   ❌ Conectividade com Supabase.com: Falhou");
}

// 4. Verificar status do Supabase
console.log("\n4️⃣ Verificando status do Supabase...");
try {
  const statusResult = execSync(
    "curl -s https://status.supabase.com/api/v2/status.json",
    { encoding: "utf8" }
  );
  const status = JSON.parse(statusResult);
  console.log(
    `   📊 Status: ${status.status.indicator === "none" ? "✅ Operacional" : "⚠️ Problemas reportados"}`
  );
} catch (error) {
  console.log("   ❌ Não foi possível verificar o status do Supabase");
}

// 5. Recomendações
console.log("\n5️⃣ Recomendações:");
console.log("   📋 Se os problemas persistirem:");
console.log("   1. Ative connection pooling no Supabase Dashboard");
console.log(
  "   2. Use a URL do pooler: postgresql://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
);
console.log("   3. Verifique se o projeto Supabase está ativo");
console.log("   4. Contate o suporte do Supabase se necessário");

console.log("\n✅ Diagnóstico concluído!\n");
