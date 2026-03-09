# Neobank Radar - Resumo para FAQ

## O que e o Neobank Radar

Neobank Radar e uma plataforma de comparacao de cartoes de debito e credito cripto. O site exibe 42+ cartoes com filtros, ordenacao e paginas de detalhes individuais. O objetivo e ajudar usuarios a encontrar o cartao ideal comparando taxas, cashback, regioes, custodias e beneficios.

**URL**: https://neobanksradar.com
**Powered by**: MOIC Digital (https://www.moicdigital.com)

## Dados dos Cartoes

Os dados sao obtidos de uma planilha Google Sheets (atualizada manualmente) e cacheados por 1 hora. Em caso de falha no fetch, o site usa dados hardcoded como fallback.

### Atributos de cada cartao

| Atributo | Descricao | Exemplos |
|----------|-----------|----------|
| Nome / Emissor | Nome do cartao e empresa emissora | Nexo Card / Nexo, Binance Card / Binance |
| Tipo | Categoria do cartao | Credit, Debit, Prepaid |
| Rede | Bandeira de pagamento | Visa, Mastercard, Visa/Mastercard |
| Cashback Maximo | Percentual maximo de cashback | 2%, 4%, 8% |
| Taxa Anual | Custo anual do cartao | Free, $100, Staking |
| Taxa de Cambio (FX) | Taxa cobrada em transacoes internacionais | 0%, 0.2%-2.5%, Not specified |
| Custodia | Modelo de custodia dos fundos | Custodial, Self-Custody, Non-Custodial, Hybrid |
| KYC | Nivel de verificacao de identidade | Required, Light, None |
| Regioes | Disponibilidade geografica | EEA/UK, Global (160+ countries), US |
| Moedas Suportadas | Moedas fiat aceitas | USD, EUR, GBP, BRL |
| Ativos Suportados | Criptomoedas aceitas | 60+ Assets, Bitcoin/ETH/USDT |
| Metal | Se o cartao e metalico | Sim/Nao |
| Bonus de Cadastro | Bonus ao se cadastrar | $25 BTC, 20 USDT, None |
| Airdrop Farming | Se permite farming de airdrops | Sim/Nao |
| Tempo no Mercado | Ha quanto tempo o produto existe | 3 years, vazio se novo |
| Beneficios (Perks) | Lista de vantagens do cartao | Cashback cripto, juros sobre saldo, beneficios de viagem |
| Link Oficial | URL do site oficial do cartao | — |

### Cartoes Incluidos (42+)

Nexo, Coinbase, Binance, Kripicard, Crypto.com, Bybit, Kast, Gemini, MetaMask, Ether.fi, Wirex, BitPay, Coca Wallet, Brighty, Cypher, Venmo, Bitrefill, WhiteBIT, Wayex, Gnosis Pay, Fold, Bleap, Bitpanda, Zypto, Ledger, Tuyo, RedotPay, Tria, Avici, Oobit, Plutus, Deblock, Ready, TapX, Fiat24, THORWallet, SafePal, UR, SavePay, imToken, TokenPocket, Bitget Wallet.

## Funcionalidades do Site

### Pagina Inicial

- Hero section com animacao de logos dos cartoes
- Grade de cartoes filtravies e ordenavies
- Contagem de resultados em tempo real

### Filtros Disponiveis

| Filtro | Tipo | Opcoes |
|--------|------|--------|
| Busca | Texto livre | Busca por nome, emissor ou beneficios |
| KYC | Tri-state | Todos / Com KYC / Sem KYC |
| Custodia | Tri-state | Todos / Self-Custody / Custodial |
| Regiao | Dropdown | US, Canada, Brazil, Argentina, Mexico, LATAM, UK, Germany, France, EEA, India, Japan, Singapore, Australia, APAC, Nigeria, UAE, Global |
| Moeda | Dropdown | USD, EUR, GBP, INR, BRL |
| Ordenacao | Dropdown | A-Z, Featured, Top Cashback, Newest |

### Pagina de Detalhes do Cartao

Cada cartao tem sua pagina em `/cards/[id]` com:

1. **Breadcrumb** - Navegacao Home > Cartao
2. **Cabecalho** - Logo, nome, emissor, badges (tipo, rede, custodia, airdrop)
3. **Metricas** - Cashback maximo, taxa anual, tempo no mercado, nivel KYC
4. **Insights Dinamicos** - Analise automatica baseada nos atributos (cashback elite/forte/moderado, modelo de custodia, privacidade, airdrop farming)
5. **Fatos Chave** - 8 atributos em grid (taxa anual, FX, rede, custodia, regioes, ativos, metal, bonus)
6. **Destaques** - Lista de beneficios do cartao

## Fonte de Dados (Google Sheets)

- **Planilha ID**: `17TiduyQc48IbZkDK0o5o1Sv4ndTbt_qPGyn6DsFTmaA`
- **Formato**: CSV exportado automaticamente
- **Revalidacao**: A cada 1 hora (ISR)
- **Fallback**: Dados hardcoded em `src/data/cards.ts` em caso de falha

### Colunas da Planilha

id, name, issuer, type, network, maxCashback, minCashback, annualFee, fxFee, Cashback & Rewards, Yield / Interest / APY, Lifestyle & Travel, signupBonus, custody, regions, officialLink, metal, supportedAssets, KYC, supportedCurrencies, Age, Airdrop Farming.

Os campos de perks (Cashback & Rewards, Yield / Interest / APY, Lifestyle & Travel) sao separados por pipe (`|`) e mesclados em um unico array de beneficios.

## SEO e Dados Estruturados

O site usa JSON-LD para:
- **Organization** - Dados da empresa
- **WebSite** - Metadados do site
- **ItemList** - Lista de todos os cartoes (pagina inicial)
- **FinancialProduct** - Detalhes de cada cartao (pagina de detalhes)
- **BreadcrumbList** - Navegacao estruturada
- **FAQPage** - 7 perguntas auto-geradas por cartao

### FAQ Atual (auto-gerado por cartao)

1. Qual a taxa anual do [cartao]?
2. Qual cashback o [cartao] oferece?
3. O [cartao] requer KYC?
4. Quais regioes o [cartao] suporta?
5. O [cartao] e custodial ou self-custody?
6. Qual rede de pagamento o [cartao] usa?
7. Quais sao as taxas de cambio do [cartao]?

## Stack Tecnica

- **Framework**: Next.js 15 (App Router) + React 19
- **Estilizacao**: Tailwind CSS 4
- **Fontes**: Clash Grotesk (display) + Sora (body)
- **Deploy**: Cloudflare (via OpenNext)
- **Dados**: Google Sheets CSV + fallback hardcoded
