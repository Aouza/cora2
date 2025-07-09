# 🌱 Seeds para o Cora.Deep - Documentação Completa

## 📋 Visão Geral

Criamos dois sistemas de seeds para popular o banco com dados realistas do Cora.Deep:

1. **Seeds Completos** (drizzle-seed) - Dados em larga escala e realísticos
2. **Seeds Simples** - Versão rápida para testes

## 🚀 Como Usar

### Pré-requisitos

```bash
# 1. Configure o DATABASE_URL no .env.local
DATABASE_URL=postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres

# 2. Aplique as migrations primeiro
yarn db:generate
# Cole o SQL no Supabase ou use: yarn db:push
```

### Executar Seeds

```bash
# Seeds simples (recomendado para começar)
yarn db:seed-simple

# Seeds completos (1000+ registros)
yarn db:seed

# Reset completo: limpa + aplica schema + seeds
yarn db:reset
```

## 📊 Dados Criados

### 🌱 Seeds Simples

- **5 usuários** com emails realistas
- **10 relatos** emocionais autênticos
- **16 ecos** (reações simbólicas: 🌱🫂💧)
- **3 relatórios** (básico, profundo, renascimento)

### 🌿 Seeds Completos (drizzle-seed)

- **15 usuários** com emails femininos realistas
- **45 relatos** emocionais profundos e variados
- **180 ecos** distribuídos realisticamente
- **12 relatórios** emocionais personalizados

## 💭 Tipos de Relatos Incluídos

### 1. **Dor e Processo**

```
"Hoje acordei e por um momento esqueci que ele não estava mais aqui..."
"É estranho como certas músicas agora me fazem chorar..."
"Três meses se passaram e ainda sinto como se fosse ontem..."
```

### 2. **Autoconhecimento**

```
"Estou descobrindo coisas sobre mim que não sabia..."
"Percebi que perdi muito de mim nesse relacionamento..."
"Comecei terapia semana passada. É assustador, mas necessário..."
```

### 3. **Esperança e Reconstrução**

```
"Acordei hoje e senti algo diferente. Uma leveza..."
"Voltei a sonhar com o futuro. Não um futuro com ele, mas meu..."
"Hoje foi o primeiro dia que sorri de verdade em semanas..."
```

### 4. **Desafios e Recaídas**

```
"Tive uma recaída ontem. Quase liguei para ele..."
"Vi ele com outra pessoa hoje. Doeu mais do que imaginava..."
"Deletei o número dele finalmente. Pequenas vitórias contam..."
```

### 5. **Crescimento e Sabedoria**

```
"Entendi que amor próprio não é egoísmo. É necessidade..."
"A mulher que sou hoje não aceitaria o que aceitei antes..."
"O término não foi o fim. Foi o início de um novo capítulo..."
```

## ❤️ Sistema de Ecos (Reações)

### Distribuição Realística:

- **🌱 Você vai florescer** (40%) - Esperança e crescimento
- **🫂 Senti algo parecido** (35%) - Empatia e identificação
- **💧 Te entendo** (25%) - Compreensão e acolhimento

## 📄 Relatórios Emocionais

### 1. **Básico** (50% dos relatórios)

- Análise simples de padrões
- Sugestões práticas
- Validação emocional

### 2. **Profundo** (30% dos relatórios)

- Análise arquetípica
- Padrões inconscientes
- Trabalho interior sugerido

### 3. **Renascimento** (20% dos relatórios)

- Celebração da transformação
- Reconhecimento do crescimento
- Visão de futuro

## 🔧 Scripts Disponíveis

```bash
# Executar seeds simples
yarn db:seed-simple

# Executar seeds completos
yarn db:seed

# Ver dados no Drizzle Studio
yarn db:studio

# Reset completo
yarn db:reset

# Testar queries com dados
yarn db:example
```

## 📝 Exemplo de Uso dos Dados

```typescript
import { buscarRelatosComEcos, contarEcosPorRelato } from "./db/queries";

// Buscar todos os relatos com ecos
const relatos = await buscarRelatosComEcos();

// Contar ecos de um relato específico
const contadores = await contarEcosPorRelato(relatoId);
// Retorna: { '🌱': 5, '🫂': 3, '💧': 2 }
```

## 🎯 Casos de Uso

### Para Desenvolvimento:

- Testar componentes com dados reais
- Validar queries e relacionamentos
- Simular cenários de uso

### Para Demonstração:

- Mostrar funcionalidades para stakeholders
- Apresentar o produto em funcionamento
- Validar UX com dados realistas

### Para Testes:

- Testar performance com volume de dados
- Validar edge cases
- Simular comportamento de usuários

## ⚠️ Considerações Importantes

### Segurança:

- **NUNCA** execute seeds em produção sem backup
- Use em ambientes de desenvolvimento/teste apenas
- Os seeds limpam dados existentes

### Performance:

- Seeds completos podem demorar alguns minutos
- Use seeds simples para testes rápidos
- Monitore uso de memória em volumes grandes

### Customização:

```typescript
// Modificar dados nos arquivos:
db/seeds.ts        // Seeds completos
db/simple-seeds.ts // Seeds simples

// Ajustar quantidades:
count: 15,         // Número de usuários
count: 45,         // Número de relatos
```

## 🚀 Próximos Passos

1. **Execute os seeds simples** para começar
2. **Teste no Drizzle Studio** - `yarn db:studio`
3. **Integre com as páginas** do dashboard
4. **Customize os dados** conforme necessário

## 🎉 Resultado

Agora o Cora.Deep tem:

- ✅ Dados realistas e emocionalmente autênticos
- ✅ Relacionamentos funcionais entre tabelas
- ✅ Volume de dados adequado para testes
- ✅ Cenários diversos de uso
- ✅ Base sólida para desenvolvimento

**O hub emocional está pronto para ganhar vida! 💜**
