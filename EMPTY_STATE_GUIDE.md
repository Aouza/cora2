# Guia de Empty States - Cora.Deep

## Visão Geral

Este documento descreve a implementação de empty states no Cora.Deep para garantir que o ambiente de produção não contenha dados de seed/mock.

## Componentes Implementados

### 1. EmptyState Component

Localização: `src/components/EmptyState.tsx`

Componente reutilizável para exibir estados vazios com:

- Ícone personalizado
- Título e descrição
- Botão de ação opcional

**Exemplo de uso:**

```tsx
<EmptyState
  icon="📚"
  title="Nenhum conteúdo disponível"
  description="Ainda não há conteúdos curados para esta categoria."
  actionText="Ver todos os conteúdos"
  onAction={() => setCategory("todos")}
/>
```

### 2. LoadingState Component

Localização: `src/components/LoadingState.tsx`

Componente para estados de carregamento com:

- Spinner animado
- Mensagem customizável
- Tamanhos diferentes (sm, md, lg)

### 3. useEmptyState Hook

Localização: `src/hooks/useEmptyState.ts`

Hook personalizado para gerenciar estados vazios:

- Detecta ambiente de produção
- Gerencia dados vazios automaticamente
- Fornece métodos para manipular dados

## Configuração de Ambiente

### Database Config

Localização: `src/db/config.ts`

Configurações baseadas no ambiente:

- `ENABLE_SEEDS`: Só true em desenvolvimento
- `EMPTY_STATE_ENABLED`: True em produção
- `REQUIRE_REAL_DATA`: True em produção

### Seeds Condicionais

Os arquivos de seed foram modificados para só executar em desenvolvimento:

- `src/db/run-seeds.ts`
- `src/db/simple-seeds.ts`

## Páginas Atualizadas

### 1. Dashboard Principal (`/dashboard`)

- Seções do Cora.Guia mostram empty state se não há conteúdo
- Mural mostra empty state se não há posts
- Leitura Emocional mostra empty state se não há análise

### 2. Mural (`/dashboard/mural`)

- Lista de posts vazia por padrão
- Empty state incentiva primeiro desabafo
- Botão foca no textarea para facilitar interação

### 3. Guia (`/dashboard/guia`)

- Lista de conteúdos vazia por padrão
- Empty state por categoria
- Botão para voltar à visualização geral

### 4. Leitura (`/dashboard/leitura`)

- Análise emocional indisponível por padrão
- Empty state com call-to-action para diagnóstico
- Navegação de seções oculta até haver dados

## Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estejam configuradas:

```env
NODE_ENV=production  # Para produção
NODE_ENV=development # Para desenvolvimento
```

## Comportamento por Ambiente

### Desenvolvimento

- Seeds são executados automaticamente
- Dados de exemplo são exibidos
- Componentes mostram dados mockados

### Produção

- Seeds são ignorados
- Empty states são exibidos por padrão
- Dados só aparecem quando realmente existem

## Próximos Passos

1. **Integração com API**: Conectar os empty states com chamadas reais de API
2. **Persistência**: Implementar sistema de dados real
3. **Validação**: Adicionar validações para dados reais vs mockados
4. **Monitoramento**: Implementar logs para acompanhar empty states

## Manutenção

### Adicionando Novos Empty States

1. Use o componente `EmptyState` existente
2. Configure o hook `useEmptyState` se necessário
3. Adicione configuração em `src/db/config.ts`
4. Documente o novo estado neste arquivo

### Testando Empty States

```bash
# Testar em ambiente de produção
NODE_ENV=production npm run dev

# Testar em ambiente de desenvolvimento
NODE_ENV=development npm run dev
```

## Checklist de Produção

- [ ] Variável NODE_ENV=production configurada
- [ ] Seeds desabilitados
- [ ] Empty states funcionando
- [ ] Dados mockados removidos
- [ ] Componentes carregando dados reais
- [ ] Logs de produção limpos
