#!/bin/bash

# Script para criar PR após push
# Uso: ./scripts/create-pr.sh

BRANCH="feature/supabase-database-setup"
BASE_BRANCH="main"
REPO="andomingos87/prospect.ind"

echo "🚀 Preparando Pull Request..."
echo ""
echo "Branch: $BRANCH"
echo "Base: $BASE_BRANCH"
echo ""

# Verificar se GitHub CLI está instalado
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI encontrado"
    echo ""
    echo "Criando PR automaticamente..."
    gh pr create \
        --base "$BASE_BRANCH" \
        --head "$BRANCH" \
        --title "🗄️ Configuração Completa do Banco de Dados Supabase" \
        --body-file PR_DESCRIPTION.md \
        --label "database" \
        --label "supabase" \
        --label "security"
else
    echo "⚠️  GitHub CLI não encontrado"
    echo ""
    echo "📋 Use o conteúdo de PR_DESCRIPTION.md para criar o PR manualmente:"
    echo ""
    echo "1. Acesse: https://github.com/$REPO/compare/$BASE_BRANCH...$BRANCH"
    echo "2. Clique em 'Create Pull Request'"
    echo "3. Use o conteúdo de PR_DESCRIPTION.md como descrição"
    echo ""
    echo "Ou instale GitHub CLI:"
    echo "  Windows: winget install GitHub.cli"
    echo "  Mac: brew install gh"
    echo "  Linux: sudo apt install gh"
fi

