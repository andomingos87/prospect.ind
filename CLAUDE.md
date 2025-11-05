# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

## Project Overview

**Sistema IA de Prospecção de Indústrias** - An AI-powered industrial prospecting system that automates lead generation for tech developers and agencies. The platform searches, classifies, and enriches data on industrial companies (medium to large size), generating qualified leads while complying with LGPD (Brazil's data protection law).

**Tech Stack:** Node.js 18+, Express 5, Supabase, ES Modules

## Development Commands

```bash
# Development (with hot reload via nodemon)
npm run dev

# Production
npm start

# Health check (server must be running)
npm run health
# or: curl http://localhost:3000/health

# Build
npm run build  # No-op currently (no build step required)

# Tests
npm test  # Not configured yet
```

## Architecture

### Project Structure

```
src/
├── index.js           # Main Express server setup, middleware, health endpoints
├── controllers/       # HTTP request handlers (empty - to be implemented)
├── services/          # Business logic (empty - to be implemented)
└── models/            # Data models (empty - to be implemented)

config/
└── index.js           # Centralized configuration with validation

utils/                 # Utility functions (to be implemented)
tests/                 # Automated tests (to be implemented)
```

### Configuration System

Configuration is centralized in [config/index.js](config/index.js). The config object contains:

- **app**: Application settings (name, environment, port)
- **database**: Supabase credentials (URL, anon key, service key)
- **search**: Search API keys (SerpAPI or Serper.dev)
- **ai**: AI API keys (Anthropic Claude or OpenAI)
- **enrichment**: Data enrichment API keys (Hunter.io, Clearbit)
- **business**: Business rules (target segments, excluded segments, goals)
- **lgpd**: LGPD compliance settings (data retention, anonymization)

**Important:** Always use `validateConfig()` before starting services that depend on external APIs. The validation ensures required environment variables are set.

### Business Rules & Constraints

**Target Segments:**
- Automação industrial
- Metalurgia
- Estruturas metálicas
- Máquinas industriais
- Componentes industriais
- Equipamentos industriais

**Excluded Segments (Non-compete clause):**
- Portas automáticas (automatic doors)
- Portões automáticos (automatic gates)

**Target Company Size:** Medium to large companies only (`config.business.minCompanySize`)

**Goals:**
- 50+ qualified leads/month
- 10% conversion rate minimum
- 90%+ accuracy in contact data
- 50% reduction in manual prospecting time

### API Integration Strategy

The system integrates with multiple external APIs with fallback options:

1. **Search APIs**: SerpAPI (primary) or Serper.dev (alternative)
2. **AI Classification**: Anthropic Claude (primary) or OpenAI GPT-4/5 (alternative)
3. **Data Enrichment**: Hunter.io for emails, Clearbit for company data (both optional)

Check `config.search`, `config.ai`, and `config.enrichment` for enabled status before using APIs.

### Environment Variables

Copy [.env.example](.env.example) to `.env` and configure:

**Required:**
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`
- At least one search API: `SERPAPI_KEY` or `SERPER_API_KEY`
- At least one AI API: `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`

**Optional:**
- `HUNTER_API_KEY`, `CLEARBIT_API_KEY` for data enrichment
- `NODE_ENV`, `PORT`, `APP_NAME` for application settings

### Server Configuration

The Express server in [src/index.js](src/index.js) includes:

- **Security**: Helmet.js for secure HTTP headers
- **CORS**: Enabled for cross-origin requests
- **Body Parsing**: JSON and URL-encoded support
- **Error Handling**: Development mode includes stack traces
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals
- **Health Check**: `GET /health` returns server status

Default port: 3000 (configurable via `PORT` env var)

## Implementation Guidelines

### MCP Integration

**Always use the Supabase MCP for database operations.** The project is configured to work with MCP servers for both Supabase and Task Master AI (see [.mcp.json](.mcp.json)).

### Code Organization

- **Controllers** (`src/controllers/`): Handle HTTP requests, validate input, call services
- **Services** (`src/services/`): Implement business logic, orchestrate API calls
- **Models** (`src/models/`): Define data structures and Supabase schemas
- **Utils** (`utils/`): Reusable helper functions

### ES Modules

This project uses ES modules (`"type": "module"` in package.json). Use:
- `import/export` (not `require/module.exports`)
- `.js` extensions in imports when needed
- `import.meta.url` for file paths (not `__dirname`)

### LGPD Compliance

When implementing data collection and storage:
- Apply data retention rules from `config.lgpd`
- Implement consent collection mechanisms
- Ensure data anonymization after retention period
- Follow LGPD guidelines for personal data processing

### Error Handling

Follow the pattern in [src/index.js](src/index.js:52-59):
- Log errors to console
- Return JSON error responses
- Include stack traces only in development
- Use appropriate HTTP status codes

### API Development Patterns

When adding new endpoints:
1. Create controller in `src/controllers/`
2. Implement business logic in `src/services/`
3. Use centralized config from `config/index.js`
4. Validate API keys before making external calls
5. Handle API errors gracefully with fallbacks
6. Return consistent JSON response format

## Testing Strategy

Tests should cover (to be implemented):
- Unit tests for business logic in services
- Integration tests for API endpoints
- Validation of configuration loading
- API client error handling
- LGPD compliance rules

## Future Implementation Areas

Based on the PRD ([prd.md](prd.md)), the following features need implementation:

1. **Search Module**: Web search integration for company discovery
2. **AI Classification**: Lead relevance scoring and filtering
3. **Data Enrichment**: Contact information enrichment (email, phone, LinkedIn)
4. **Storage**: Supabase schema and data persistence
5. **Export**: CSV generation and webhook integration
6. **Reporting**: Basic performance analytics
7. **Job System**: Background job processing for large batches

Refer to the PRD for detailed requirements and user stories.