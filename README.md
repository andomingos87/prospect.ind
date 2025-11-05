# Sistema IA de Prospecção de Indústrias

> Automatize a geração de leads qualificados de indústrias com inteligência artificial

[![Node.js](https://img.shields.io/badge/Node.js-≥18.0.0-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)]()

## 📋 Sobre o Projeto

O **Sistema IA de Prospecção de Indústrias** é uma plataforma automatizada que utiliza inteligência artificial para buscar, classificar e enriquecer dados de empresas industriais, gerando leads qualificados para desenvolvedores e agências de tecnologia.

### Objetivos

- 🎯 Buscar e classificar empresas industriais qualificadas (nome, porte, localização, site, contato)
- 🤖 Utilizar IA para filtrar e enriquecer dados automaticamente
- 📊 Exportar resultados para CRM ou planilhas
- ⚡ Reduzir o tempo de prospecção manual em 50%
- 🎯 Alcançar precisão ≥ 90% nos dados de contato

## 🚀 Funcionalidades (MVP)

- ✅ Filtros personalizados (porte, localização, segmento, faturamento)
- ✅ Captura automática via API de busca web (SerpAPI/Serper.dev)
- ✅ Classificação de relevância via IA (GPT-4/Claude)
- ✅ Enriquecimento de dados (e-mail, telefone, LinkedIn)
- ✅ Armazenamento no Supabase
- ✅ Exportação CSV e integração via webhook
- ✅ Conformidade com LGPD

## 🏗️ Estrutura do Projeto

```
prospect-ai-system/
├── src/
│   ├── controllers/     # Controladores de requisições HTTP
│   ├── services/        # Lógica de negócio
│   └── models/          # Modelos de dados
├── config/              # Configurações da aplicação
├── utils/               # Funções utilitárias
├── tests/               # Testes automatizados
├── .taskmaster/         # Gerenciamento de tarefas (Task Master AI)
├── .env.example         # Exemplo de variáveis de ambiente
└── package.json         # Dependências e scripts
```

## 📦 Requisitos do Sistema

- **Node.js**: ≥ 18.0.0
- **npm**: ≥ 9.0.0
- **Sistema Operacional**: Windows, macOS ou Linux

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd prospect-ai-system
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis necessárias:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves de API:

```env
# Application
NODE_ENV=development
PORT=3000

# Database - Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Search APIs (escolha uma)
SERPAPI_KEY=your_serpapi_key
# ou
SERPER_API_KEY=your_serper_key

# AI APIs (escolha uma)
ANTHROPIC_API_KEY=your_anthropic_key
# ou
OPENAI_API_KEY=your_openai_key

# Data Enrichment (opcional)
HUNTER_API_KEY=your_hunter_key
CLEARBIT_API_KEY=your_clearbit_key
```

## 🎮 Comandos Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start

# Build (quando disponível)
npm run build

# Testes
npm test              # Executar todos os testes com coverage
npm run test:watch    # Executar testes em modo watch
npm run test:coverage # Gerar relatório de coverage

# Qualidade de Código
npm run lint          # Verificar problemas de linting
npm run lint:fix      # Corrigir automaticamente problemas de linting
npm run format        # Formatar código com Prettier
npm run format:check  # Verificar formatação sem alterar arquivos
npm run qa:pre-commit # Executar todas as verificações de QA (lint + format + test + audit)

# Health check
npm run health
```

## 🌐 Endpoints da API

### Endpoints Básicos

- `GET /` - Informações da API
- `GET /health` - Status de saúde do servidor

### Exemplo de Resposta

```json
{
  "name": "Sistema IA de Prospecção de Indústrias",
  "version": "1.0.0",
  "description": "API para prospecção automatizada de indústrias",
  "endpoints": {
    "health": "/health",
    "api": "/api/v1"
  }
}
```

## 🔒 Segurança

O projeto implementa as seguintes medidas de segurança:

- ✅ **Helmet.js**: Headers HTTP seguros
- ✅ **CORS**: Controle de Cross-Origin Resource Sharing
- ✅ **Dotenv**: Variáveis de ambiente protegidas
- ✅ **LGPD**: Conformidade com a Lei Geral de Proteção de Dados
- ✅ **Git Hooks**: Verificação automática de secrets antes de commits
- ✅ **npm audit**: Verificação de vulnerabilidades em dependências

## 🛡️ Gate de QA Automatizado

O projeto possui um sistema completo de QA automatizado que garante a qualidade do código em todo commit:

### Verificações Automáticas

Todas as verificações são executadas automaticamente antes de cada commit:

1. **Linting**: Verificação de padrões de código com ESLint
2. **Formatação**: Formatação automática com Prettier
3. **Testes**: Execução de todos os testes com coverage mínimo de 70%
4. **Secrets**: Bloqueio de commit de arquivos sensíveis (.env, .key, .pem)
5. **Validação de Commits**: Mensagens devem seguir [Conventional Commits](https://www.conventionalcommits.org/)

### Formato de Commits

As mensagens de commit devem seguir o padrão Conventional Commits:

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção
- `perf`: Performance
- `ci`: CI/CD
- `build`: Build

**Exemplos válidos:**

```
feat: adiciona endpoint de busca de leads industriais
fix: corrige validação de dados de contato
docs: atualiza README com instruções de instalação
test: adiciona testes para serviço de prospecção
chore: atualiza dependências do projeto
```

### Configuração

O sistema utiliza:

- **Husky**: Git hooks automatizados
- **lint-staged**: Executa verificações apenas em arquivos alterados
- **ESLint**: Linter JavaScript com regras customizadas
- **Prettier**: Formatador de código
- **Jest**: Framework de testes com coverage
- **Commitlint**: Validador de mensagens de commit

### Coverage Mínimo

O projeto está configurado para exigir um coverage mínimo que deve ser aumentado gradualmente conforme mais código e testes são adicionados:

- **Inicial**: 0% (permitido durante desenvolvimento inicial)
- **Meta**: 70% em branches, functions, lines e statements

O threshold pode ser ajustado no arquivo `jest.config.js`. Conforme mais testes são adicionados, o threshold deve ser aumentado gradualmente até atingir 70%.

Se o coverage ficar abaixo do mínimo configurado, o commit será bloqueado.

## 📊 Regras de Negócio

### Segmentos-Alvo

- Automação industrial
- Metalurgia
- Estruturas metálicas
- Máquinas industriais
- Componentes industriais
- Equipamentos industriais

### Segmentos Excluídos

Por cláusula de não-concorrência:

- Portas automáticas
- Portões automáticos

### Metas

- **Leads/mês**: 50+ leads qualificados
- **Taxa de conversão**: ≥ 10%
- **Precisão de dados**: ≥ 90%

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js 18+
- **Framework Web**: Express 5.x
- **Banco de Dados**: Supabase
- **IA**: Claude (Anthropic) / GPT-4 (OpenAI)
- **Busca Web**: SerpAPI / Serper.dev
- **Enriquecimento**: Hunter.io / Clearbit
- **Segurança**: Helmet, CORS
- **Desenvolvimento**: Nodemon

## 📈 Roadmap

- [x] Configuração inicial do projeto
- [ ] Configuração do banco de dados Supabase
- [ ] Implementação do sistema de configuração
- [ ] Integração com API de busca web
- [ ] Parser de resultados de busca
- [ ] Módulo de classificação com IA
- [ ] Sistema de enriquecimento de dados
- [ ] Armazenamento e cache
- [ ] Exportação CSV
- [ ] Sistema de webhooks
- [ ] Interface web
- [ ] Relatórios e analytics
- [ ] Sistema de jobs
- [ ] Conformidade LGPD completa
- [ ] Autenticação e autorização
- [ ] Monitoramento e logging
- [ ] Testes automatizados
- [ ] Deploy em produção

## 📝 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

**Anderson Domingos**

---

**Mensagem-chave**: _"Automatize a geração de leads industriais de alto ticket e foque em fechar negócios, não em caçar dados."_
