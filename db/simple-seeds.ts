import { db, users, relatos, ecos, relatorios } from "./index";

async function simpleSeed() {
  console.log("🌱 Criando seeds simples para o Cora.Deep...");

  try {
    // Limpar dados existentes (cuidado em produção!)
    await db.delete(ecos);
    await db.delete(relatorios);
    await db.delete(relatos);
    await db.delete(users);

    // Criar usuários
    const usuariosCriados = await db
      .insert(users)
      .values([
        { email: "maria@exemplo.com" },
        { email: "ana@exemplo.com" },
        { email: "julia@exemplo.com" },
        { email: "carla@exemplo.com" },
        { email: "fernanda@exemplo.com" },
      ])
      .returning();

    console.log("✅ Usuários criados:", usuariosCriados.length);

    // Criar relatos
    const relatosCriados = await db
      .insert(relatos)
      .values([
        {
          texto:
            "Hoje foi um dia difícil, mas sinto que estou evoluindo aos poucos...",
          userId: usuariosCriados[0].id,
        },
        {
          texto:
            "Descobri uma nova paixão pela pintura. Está me ajudando muito no processo.",
          userId: usuariosCriados[0].id,
        },
        {
          texto:
            "As pessoas dizem que o tempo cura tudo. Espero que seja verdade.",
          userId: usuariosCriados[1].id,
        },
        {
          texto:
            "Comecei terapia e está sendo revelador. Recomendo para todas.",
          userId: usuariosCriados[1].id,
        },
        {
          texto: "Hoje acordei e por um momento esqueci da dor. Progresso!",
          userId: usuariosCriados[2].id,
        },
        {
          texto:
            "Minha mãe me disse algo que me marcou: você é mais forte do que imagina.",
          userId: usuariosCriados[2].id,
        },
        {
          texto:
            "Saí com as amigas e ri muito. Me senti culpada, mas foi necessário.",
          userId: usuariosCriados[3].id,
        },
        {
          texto: "Estou aprendendo a ficar sozinha comigo mesma. É libertador.",
          userId: usuariosCriados[3].id,
        },
        {
          texto: "Deletei o número dele hoje. Pequenas vitórias contam.",
          userId: usuariosCriados[4].id,
        },
        {
          texto:
            "Se pudesse voltar no tempo, viveria tudo de novo. A dor valeu o aprendizado.",
          userId: usuariosCriados[4].id,
        },
      ])
      .returning();

    console.log("✅ Relatos criados:", relatosCriados.length);

    // Criar ecos (reações simbólicas)
    const ecosCriados = await db
      .insert(ecos)
      .values([
        // Ecos para o primeiro relato
        { relatoId: relatosCriados[0].id, tipo: "🌱" },
        { relatoId: relatosCriados[0].id, tipo: "🫂" },
        { relatoId: relatosCriados[0].id, tipo: "🌱" },
        { relatoId: relatosCriados[0].id, tipo: "💧" },

        // Ecos para outros relatos
        { relatoId: relatosCriados[1].id, tipo: "🌱" },
        { relatoId: relatosCriados[1].id, tipo: "🌱" },
        { relatoId: relatosCriados[2].id, tipo: "🫂" },
        { relatoId: relatosCriados[2].id, tipo: "💧" },
        { relatoId: relatosCriados[3].id, tipo: "🌱" },
        { relatoId: relatosCriados[4].id, tipo: "🫂" },
        { relatoId: relatosCriados[4].id, tipo: "🌱" },
        { relatoId: relatosCriados[5].id, tipo: "🌱" },
        { relatoId: relatosCriados[6].id, tipo: "🫂" },
        { relatoId: relatosCriados[7].id, tipo: "🌱" },
        { relatoId: relatosCriados[8].id, tipo: "🌱" },
        { relatoId: relatosCriados[9].id, tipo: "🌱" },
      ])
      .returning();

    console.log("✅ Ecos criados:", ecosCriados.length);

    // Criar relatórios
    const relatoriosCriados = await db
      .insert(relatorios)
      .values([
        {
          userId: usuariosCriados[0].id,
          tipo: "basico",
          conteudo: `## Sua Jornada Emocional - Análise Básica

**Padrão Identificado:** Processo de Aceitação em Desenvolvimento

Baseando-se nos seus relatos, percebo um movimento natural de processamento emocional. Você está navegando entre momentos de tristeza e clareza.

**Pontos de Luz:**
- Reconhecimento da própria dor como válida  
- Busca por atividades de autocuidado
- Abertura para compartilhar sentimentos

**Sugestões:**
- Continue registrando seus sentimentos
- Mantenha rotinas que tragam conforto
- Seja gentil consigo mesma`,
        },
        {
          userId: usuariosCriados[1].id,
          tipo: "profundo",
          conteudo: `## Análise Emocional Profunda - Padrões Inconscientes

**Arquétipo Identificado:** A Fênix em Transformação

Você não está apenas se recuperando, está se transformando em uma versão mais autêntica de si mesma.

**Camadas Emocionais:**
1. **Resistência:** Parte que resiste à mudança
2. **Sabedoria:** Nova percepção sobre relacionamentos  
3. **Renovação:** Nova identidade se formando

**Trabalho Interior:**
Explore: "Quem sou eu quando não estou tentando ser quem alguém precisa que eu seja?"`,
        },
        {
          userId: usuariosCriados[2].id,
          tipo: "renascimento",
          conteudo: `## Relatório de Renascimento - Novo Ciclo Vital

**Fase Atual:** Emergindo da Crisálida

Parabéns! Você completou um ciclo profundo de transformação.

**Transformações Observadas:**
- Linguagem: de "perdida" para "descobrindo"
- Energia: de drenada para criativa
- Foco: de "por que?" para "quem eu quero ser?"

**Próximo Capítulo:**
Você não está mais "superando" o passado. Está construindo conscientemente o futuro.

**Celebração:**
Reconheça este momento. Você transformou um fim em um começo.`,
        },
      ])
      .returning();

    console.log("✅ Relatórios criados:", relatoriosCriados.length);

    console.log("\n🎉 Seeds simples concluídos com sucesso!");
    console.log("📊 Resumo:");
    console.log(`   👤 ${usuariosCriados.length} usuários`);
    console.log(`   💭 ${relatosCriados.length} relatos`);
    console.log(`   ❤️ ${ecosCriados.length} ecos`);
    console.log(`   📄 ${relatoriosCriados.length} relatórios`);
  } catch (error) {
    console.error("❌ Erro ao criar seeds:", error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  simpleSeed();
}

export { simpleSeed };
