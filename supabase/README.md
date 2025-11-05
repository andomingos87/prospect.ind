# Supabase Migrations

Este diretório contém as migrations SQL do Supabase para versionamento do schema do banco de dados.

## Estrutura

As migrations são organizadas por data/hora no formato `YYYYMMDDHHMMSS_description.sql`:

- `20250105000001_create_companies_table.sql` - Criação da tabela companies
- `20250105000002_create_contacts_table.sql` - Criação da tabela contacts
- `20250105000003_create_classifications_table.sql` - Criação da tabela classifications
- `20250105000004_enable_rls_initial_policies.sql` - Habilitação de RLS e políticas iniciais
- `20250105000000_restrict_rls_policies.sql` - Restrição de políticas RLS para segurança

## Como Aplicar Migrations

### Localmente (via Supabase CLI)

1. Instale o Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Faça login no Supabase:

   ```bash
   supabase login
   ```

3. Link seu projeto:

   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Aplique as migrations:
   ```bash
   supabase db push
   ```

### Via Dashboard do Supabase

1. Acesse o dashboard do Supabase
2. Vá em **SQL Editor**
3. Execute cada migration SQL na ordem cronológica
4. Verifique se as migrations foram aplicadas corretamente

### Via MCP (Model Context Protocol)

Se você estiver usando o MCP do Supabase, pode aplicar migrations diretamente:

```javascript
// Exemplo de uso via MCP
mcp_supabase_apply_migration({
  name: 'restrict_rls_policies',
  query: '-- conteúdo SQL da migration',
});
```

## Como Criar Nova Migration

1. Crie um novo arquivo com timestamp atual:

   ```bash
   # Formato: YYYYMMDDHHMMSS_description.sql
   touch supabase/migrations/$(date +%Y%m%d%H%M%S)_your_migration_name.sql
   ```

2. Escreva o SQL da migration:

   ```sql
   -- Migration: Descrição da migration
   -- Description: O que esta migration faz
   -- Date: YYYY-MM-DD

   -- Seu SQL aqui
   ```

3. Teste localmente antes de aplicar em produção

4. Aplique a migration seguindo os passos acima

## Ordem de Aplicação

As migrations são aplicadas em ordem cronológica (por timestamp). Certifique-se de que:

1. Migrations de criação de tabelas são aplicadas antes de migrations que as referenciam
2. Migrations de RLS são aplicadas após a criação das tabelas
3. Migrations de alteração de policies são aplicadas após as policies iniciais

## Reverter Migrations

Para reverter uma migration, você precisa criar uma migration de rollback:

```sql
-- Exemplo: Rollback da migration de restrição de RLS
-- Migration: Rollback RLS restrictions
-- Description: Restaura políticas permissivas (apenas para desenvolvimento)

-- Restaurar policies originais
-- (código de rollback aqui)
```

**IMPORTANTE**: Sempre teste migrations de rollback em ambiente de desenvolvimento antes de aplicar em produção.

## Verificação de Status

Para verificar quais migrations foram aplicadas:

```bash
# Via Supabase CLI
supabase migration list

# Via SQL direto
SELECT * FROM supabase_migrations.schema_migrations ORDER BY version;
```

## Notas Importantes

- **Nunca edite migrations já aplicadas** - sempre crie uma nova migration para correções
- **Sempre teste em desenvolvimento** antes de aplicar em produção
- **Backup antes de aplicar** migrations que alteram dados existentes
- **Documente mudanças** complexas no código SQL da migration

## Segurança

- A migration `20250105000000_restrict_rls_policies.sql` remove permissões de escrita da role `anon`
- Após aplicar esta migration, o backend **DEVE** usar `SUPABASE_SERVICE_KEY` para todas as operações
- Verifique `docs/RLS_LGPD.md` para mais detalhes sobre políticas de segurança
