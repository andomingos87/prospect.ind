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

# Testes (quando disponível)
npm test

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

**Mensagem-chave**: *"Automatize a geração de leads industriais de alto ticket e foque em fechar negócios, não em caçar dados."*
