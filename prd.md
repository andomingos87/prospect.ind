# PRD — Sistema IA de Prospecção de Indústrias

## 1. Informações Gerais

**Nome do Produto:** Sistema IA de Prospecção de Indústrias
**Data:** 2025-11-04
**Autor:** Anderson (Programador)
**Stakeholders:** Anderson (responsável técnico), equipe de vendas, equipe de IA/automação
**Status:** Em planejamento

---

## 2. Visão e Objetivo

**Visão:** Automatizar a geração de leads qualificados de indústrias para desenvolvedores e agências de tecnologia, reduzindo o tempo de prospecção e aumentando o ticket médio de contratos.
**Objetivo:** Criar uma plataforma que:

* Busque e classifique empresas industriais qualificadas (nome, porte, localização, site, contato)
* Utilize IA para filtrar e enriquecer dados
* Exporte resultados para CRM ou planilha

---

## 3. Segmento de Mercado e Público-Alvo

**Segmento-alvo:** Indústrias de porte médio e grande no Brasil (excluindo fabricantes de portas e portões automáticos, por cláusula de não concorrência).
**Exemplos de segmentos:** automação industrial, metalurgia, estruturas metálicas, máquinas, componentes e equipamentos industriais.
**Usuários primários:** Anderson e equipe de vendas.
**Usuários secundários:** analistas de dados e futuros clientes que possam contratar a ferramenta como serviço.

---

## 4. Problemas Resolvidos

* Prospecção manual lenta e ineficiente
* Falta de dados de contato precisos
* Dificuldade em identificar empresas com alto potencial de contrato
* Falta de sistema automatizado de geração e qualificação de leads

---

## 5. Métricas de Sucesso

* 50+ leads industriais qualificados/mês
* Conversão mínima de 10% de leads em contato ativo
* Ticket médio acima de R$ XX.XXX
* Redução de 50% no tempo de prospecção manual
* Precisão ≥ 90% nos dados de contato

---

## 6. Escopo

### Dentro do Escopo (MVP)

* Filtros personalizados (porte, localização, segmento, faturamento estimado)
* Captura automática via API de busca web (SerpAPI, Serper.dev ou similar)
* Classificação de relevância via IA (GPT-4/5)
* Enriquecimento de dados (e-mail, telefone, LinkedIn)
* Armazenamento no Supabase
* Exportação CSV e integração via webhook

### Fora do Escopo (MVP)

* Automação de envio de e-mails/campanhas
* Dashboards complexos ou relatórios visuais
* Aplicativo mobile
* Multilíngue
* Expansão internacional

---

## 7. Histórias de Usuário

| ID  | Persona  | História                                                        | Critério de Aceitação                       |
| --- | -------- | --------------------------------------------------------------- | ------------------------------------------- |
| US1 | Anderson | Definir critérios de filtro para capturar indústrias relevantes | Filtros salvos e aplicados com sucesso      |
| US2 | Sistema  | Buscar empresas industriais via web conforme filtros            | Retornar lista com nome, site, localização  |
| US3 | IA       | Classificar empresas por relevância e explicar motivo           | Empresa recebe rótulo e justificativa breve |
| US4 | Sistema  | Enriquecer dados de contato para empresas qualificadas          | Dados completos armazenados                 |
| US5 | Vendas   | Exportar leads para CSV ou CRM                                  | Arquivo ou webhook funcional                |
| US6 | Analista | Acompanhar número de leads e conversões                         | Relatório básico acessível                  |

---

## 8. Requisitos Funcionais

* **RF1:** Interface para configuração de filtros
* **RF2:** Conector com API de busca
* **RF3:** Módulo IA de classificação
* **RF4:** Conector de enriquecimento de contatos
* **RF5:** Banco de dados Supabase com campos padronizados
* **RF6:** Exportação para CSV e integração via webhook
* **RF7:** Relatório simples de performance

---

## 9. Requisitos Não Funcionais

* **RNF1:** Suporte para até 10.000 leads/mês
* **RNF2:** Conformidade LGPD e segurança dos dados
* **RNF3:** Disponibilidade mínima de 99,5%
* **RNF4:** Código modular e documentado
* **RNF5:** Interface web compatível com navegadores modernos

---

## 10. Dependências e Restrições

* Acesso a APIs de busca e enriquecimento (podem ter custo)
* Restrição de não-concorrência com fabricantes de portas/portões
* Conformidade com LGPD

---

## 11. Cronograma Estimado

| Fase | Descrição                            | Duração    |
| ---- | ------------------------------------ | ---------- |
| 1    | Definição e arquitetura do MVP       | 2 semanas  |
| 2    | Implementação de filtros e busca web | 4 semanas  |
| 3    | Implementação do módulo IA           | 6 semanas  |
| 4    | Enriquecimento e banco de dados      | 8 semanas  |
| 5    | Exportação e relatório básico        | 10 semanas |
| 6    | Testes e validação                   | 12 semanas |

---

## 12. Riscos e Mitigações

| Risco                    | Mitigação                                           |
| ------------------------ | --------------------------------------------------- |
| Custos elevados de API   | Uso de planos gratuitos e otimização de requisições |
| Leads de baixa qualidade | Ajuste de filtros e re-treinamento de IA            |
| Escopo crescente         | Manter MVP focado e iterar após validação           |
| Restrições de dados      | Aplicar regras de LGPD desde o design               |

---

## 13. Valor para o Negócio

* **Para você:** Escalabilidade comercial e contratos de alto ticket
* **Para o mercado:** Redução de tempo e custo de prospecção industrial
* **Mensagem-chave:** “Automatize a geração de leads industriais de alto ticket e foque em fechar negócios, não em caçar dados.”

---

**Fim do Documento — PRD v1.0**# PRD — Sistema IA de Prospecção de Indústrias

## 1. Informações Gerais

**Nome do Produto:** Sistema IA de Prospecção de Indústrias
**Data:** 2025-11-04
**Autor:** Anderson (Programador)
**Stakeholders:** Anderson (responsável técnico), equipe de vendas, equipe de IA/automação
**Status:** Em planejamento

---

## 2. Visão e Objetivo

**Visão:** Automatizar a geração de leads qualificados de indústrias para desenvolvedores e agências de tecnologia, reduzindo o tempo de prospecção e aumentando o ticket médio de contratos.
**Objetivo:** Criar uma plataforma que:

* Busque e classifique empresas industriais qualificadas (nome, porte, localização, site, contato)
* Utilize IA para filtrar e enriquecer dados
* Exporte resultados para CRM ou planilha

---

## 3. Segmento de Mercado e Público-Alvo

**Segmento-alvo:** Indústrias de porte médio e grande no Brasil (excluindo fabricantes de portas e portões automáticos, por cláusula de não concorrência).
**Exemplos de segmentos:** automação industrial, metalurgia, estruturas metálicas, máquinas, componentes e equipamentos industriais.
**Usuários primários:** Anderson e equipe de vendas.
**Usuários secundários:** analistas de dados e futuros clientes que possam contratar a ferramenta como serviço.

---

## 4. Problemas Resolvidos

* Prospecção manual lenta e ineficiente
* Falta de dados de contato precisos
* Dificuldade em identificar empresas com alto potencial de contrato
* Falta de sistema automatizado de geração e qualificação de leads

---

## 5. Métricas de Sucesso

* 50+ leads industriais qualificados/mês
* Conversão mínima de 10% de leads em contato ativo
* Ticket médio acima de R$ XX.XXX
* Redução de 50% no tempo de prospecção manual
* Precisão ≥ 90% nos dados de contato

---

## 6. Escopo

### Dentro do Escopo (MVP)

* Filtros personalizados (porte, localização, segmento, faturamento estimado)
* Captura automática via API de busca web (SerpAPI, Serper.dev ou similar)
* Classificação de relevância via IA (GPT-4/5)
* Enriquecimento de dados (e-mail, telefone, LinkedIn)
* Armazenamento no Supabase
* Exportação CSV e integração via webhook

### Fora do Escopo (MVP)

* Automação de envio de e-mails/campanhas
* Dashboards complexos ou relatórios visuais
* Aplicativo mobile
* Multilíngue
* Expansão internacional

---

## 7. Histórias de Usuário

| ID  | Persona  | História                                                        | Critério de Aceitação                       |
| --- | -------- | --------------------------------------------------------------- | ------------------------------------------- |
| US1 | Anderson | Definir critérios de filtro para capturar indústrias relevantes | Filtros salvos e aplicados com sucesso      |
| US2 | Sistema  | Buscar empresas industriais via web conforme filtros            | Retornar lista com nome, site, localização  |
| US3 | IA       | Classificar empresas por relevância e explicar motivo           | Empresa recebe rótulo e justificativa breve |
| US4 | Sistema  | Enriquecer dados de contato para empresas qualificadas          | Dados completos armazenados                 |
| US5 | Vendas   | Exportar leads para CSV ou CRM                                  | Arquivo ou webhook funcional                |
| US6 | Analista | Acompanhar número de leads e conversões                         | Relatório básico acessível                  |

---

## 8. Requisitos Funcionais

* **RF1:** Interface para configuração de filtros
* **RF2:** Conector com API de busca
* **RF3:** Módulo IA de classificação
* **RF4:** Conector de enriquecimento de contatos
* **RF5:** Banco de dados Supabase com campos padronizados
* **RF6:** Exportação para CSV e integração via webhook
* **RF7:** Relatório simples de performance

---

## 9. Requisitos Não Funcionais

* **RNF1:** Suporte para até 10.000 leads/mês
* **RNF2:** Conformidade LGPD e segurança dos dados
* **RNF3:** Disponibilidade mínima de 99,5%
* **RNF4:** Código modular e documentado
* **RNF5:** Interface web compatível com navegadores modernos

---

## 10. Dependências e Restrições

* Acesso a APIs de busca e enriquecimento (podem ter custo)
* Restrição de não-concorrência com fabricantes de portas/portões
* Conformidade com LGPD

---

## 11. Cronograma Estimado

| Fase | Descrição                            | Duração    |
| ---- | ------------------------------------ | ---------- |
| 1    | Definição e arquitetura do MVP       | 2 semanas  |
| 2    | Implementação de filtros e busca web | 4 semanas  |
| 3    | Implementação do módulo IA           | 6 semanas  |
| 4    | Enriquecimento e banco de dados      | 8 semanas  |
| 5    | Exportação e relatório básico        | 10 semanas |
| 6    | Testes e validação                   | 12 semanas |

---

## 12. Riscos e Mitigações

| Risco                    | Mitigação                                           |
| ------------------------ | --------------------------------------------------- |
| Custos elevados de API   | Uso de planos gratuitos e otimização de requisições |
| Leads de baixa qualidade | Ajuste de filtros e re-treinamento de IA            |
| Escopo crescente         | Manter MVP focado e iterar após validação           |
| Restrições de dados      | Aplicar regras de LGPD desde o design               |

---

## 13. Valor para o Negócio

* **Para você:** Escalabilidade comercial e contratos de alto ticket
* **Para o mercado:** Redução de tempo e custo de prospecção industrial
* **Mensagem-chave:** “Automatize a geração de leads industriais de alto ticket e foque em fechar negócios, não em caçar dados.”
