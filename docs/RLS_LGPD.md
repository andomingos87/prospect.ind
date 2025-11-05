# Row Level Security (RLS) e LGPD Compliance

Este documento descreve as políticas de Row Level Security (RLS) implementadas no sistema para garantir compliance com a LGPD (Lei Geral de Proteção de Dados).

## Visão Geral

Todas as tabelas do sistema (`companies`, `contacts`, `classifications`) têm RLS habilitado para garantir que apenas operações autorizadas possam ser realizadas nos dados.

## Políticas Implementadas

### Tabela: `companies`

- **SELECT**: Permitido para role `anon` (leitura de dados)
- **INSERT**: Permitido para role `anon` (criação de empresas)
- **UPDATE**: Permitido para role `anon` (atualização de dados)
- **DELETE**: Permitido para role `anon` com condições (compliance LGPD)

### Tabela: `contacts`

- **SELECT**: Permitido para role `anon` (leitura de contatos)
- **INSERT**: Permitido para role `anon` (criação de contatos)
- **UPDATE**: Permitido para role `anon` (atualização de contatos)
- **DELETE**: Permitido para role `anon` com condições (compliance LGPD)

### Tabela: `classifications`

- **SELECT**: Permitido para role `anon` (leitura de classificações)
- **INSERT**: Permitido para role `anon` (criação de classificações)
- **UPDATE**: Permitido para role `anon` (atualização de classificações)
- **DELETE**: Permitido para role `anon` com condições (audit trail)

## Considerações de Segurança

### Ambiente de Desenvolvimento

As políticas atuais permitem acesso usando a `anon` key, o que é adequado para desenvolvimento e testes.

### Ambiente de Produção

Para produção, recomenda-se:

1. **Usar Service Role Key no Backend**: O backend da aplicação deve usar a `service_role` key para operações administrativas, não a `anon` key.

2. **Autenticação de Usuários**: Implementar autenticação adequada (Supabase Auth) e ajustar as policies para considerar o contexto do usuário autenticado.

3. **Audit Trail**: Implementar logging de todas as operações de DELETE para compliance com LGPD.

4. **Soft Deletes**: Considerar implementar soft deletes (campo `deleted_at`) ao invés de DELETE físico para melhor rastreabilidade.

## Compliance LGPD

### Princípios Implementados

1. **Finalidade**: Dados armazenados apenas para prospecção de leads industriais
2. **Necessidade**: Apenas dados essenciais são coletados
3. **Transparência**: Policies documentadas e auditáveis
4. **Segurança**: RLS habilitado em todas as tabelas
5. **Prevenção**: Políticas restritivas de DELETE

### Recomendações Adicionais

1. **Data Retention**: Implementar políticas de retenção de dados
2. **Right to be Forgotten**: Implementar endpoint para exclusão de dados pessoais
3. **Data Portability**: Implementar exportação de dados em formato estruturado
4. **Access Control**: Implementar controle de acesso baseado em roles/permissões
5. **Audit Logging**: Logar todas as operações em dados pessoais

## Verificação

Para verificar o status do RLS:

```sql
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Próximos Passos

1. Implementar autenticação de usuários
2. Ajustar policies para considerar contexto do usuário
3. Implementar audit trail completo
4. Implementar soft deletes
5. Criar endpoints para compliance LGPD (exclusão, portabilidade)
