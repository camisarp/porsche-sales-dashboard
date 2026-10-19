# Porsche Sales Intelligence 🏎️

Dashboard executivo interativo desenvolvido no **Bootcamp Santander – Excel com IA e Claude (DIO)**, a partir de 100 registros de vendas da Porsche.

## 🌐 Dashboard publicado

**[Acessar o dashboard](https://camisarp.github.io/porsche-sales-dashboard/)**  
> O link ficará ativo após habilitar o GitHub Pages em **Settings → Pages → Deploy from a branch → main / (root)**.

## Perguntas de negócio

1. **Quais modelos vendem mais?** Para identificar líderes de volume e orientar o mix de produtos.
2. **Quais cidades geram mais receita?** Para visualizar concentração geográfica do faturamento.
3. **Quais métodos de pagamento são mais utilizados?** Para compreender preferências de compra.

**Análise complementar:** distribuição por ano do veículo. Os gráficos e indicadores se atualizam com os filtros de **modelo**, **ano**, **cidade** e **pagamento**. Indicadores de topo: quantidade de vendas, receita total, ticket médio e modelo líder.

## Tratamento da base

- Utilização exclusiva dos campos já sanitizados da aba `Sanitized`.
- Conversão de `SalesPriceSanitized` para valor numérico (USD), `ModelYearSanitized` para inteiro e quilometragem para número.
- Preservação de `INVALID` como valor ausente (`null`) em datas ou dados não válidos; datas ausentes aparecem como **Sem data**.
- Conversão de registros para JSON incorporado no HTML para publicação estática, sem depender de servidor.
- Base original contém **100 registros**; dados sanitizados disponíveis em `dados_sanitizados.json`.

## Processo com IA

**Ferramenta:** ChatGPT, com geração direta de código HTML/CSS/JavaScript. Não foi utilizado agente com skill própria nesta primeira versão.

**Prompt inicial:**

> Crie um dashboard executivo em HTML, CSS e JavaScript, em arquivo único, a partir de 100 vendas sanitizadas da Porsche. Inclua indicadores de vendas, receita, ticket médio e modelo líder; gráficos que respondam quais modelos vendem mais, quais cidades geram mais receita e quais métodos de pagamento predominam; filtros por modelo, cidade, ano e pagamento; visual premium inspirado na Porsche; tabelas para auditoria; dados incorporados para hospedagem no GitHub Pages.

**Refinamentos desta versão:** identidade visual escura com destaque vermelho, responsividade para celular, filtros combináveis, gráficos sem dependências externas, tratamento de dados inválidos, tabela filtrável e insights dinâmicos.

## Identidade visual

| Cor | Hex | Aplicação |
|---|---|---|
| Grafite | `#0C0F14` | Fundo |
| Azul escuro | `#161C25` | Cards |
| Vermelho | `#E31B36` | Destaques/gráficos |
| Dourado | `#E9BE7A` | Rótulos estratégicos |
| Branco | `#F8F9FB` | Texto principal |

Tipografia: Inter com fallback para fontes de sistema.

## Estrutura

```text
porsche-sales-dashboard/
├── index.html                # Dashboard completo e publicável
├── dados_sanitizados.json    # Base transformada para conferência
└── README.md                 # Documentação do projeto
```

## Como executar

Abra o `index.html` em qualquer navegador moderno. Não é necessário instalar bibliotecas nem iniciar servidor.

## Como publicar

1. Crie o repositório público `porsche-sales-dashboard` no GitHub.
2. Envie os três arquivos para a raiz da branch `main`.
3. Acesse **Settings → Pages**; selecione **Deploy from a branch**, **main** e **/(root)**.
4. Aguarde a publicação e teste os filtros na URL informada acima.

## Evidências

Na próxima revisão, adicionar prints da visão geral e de um filtro aplicado na pasta `imagens/`.

---
Projeto educacional de portfólio. Porsche é marca de seus respectivos titulares; não há afiliação oficial.
