# Neobank Radar — Contexto para Marketing

> Este documento serve como guia de contexto para uso com ChatGPT ou outras IAs generativas. Cole este conteúdo no início de uma conversa para que a IA entenda completamente o produto e possa ajudar com copy, estratégia, conteúdo e comunicação.

---

## 1. O que é o Neobank Radar

O **Neobank Radar** é uma plataforma de comparação e descoberta de cartões cripto (débito, crédito e pré-pagos) emitidos por neobanks e fintechs Web3. O site permite que usuários comparem mais de 44 cartões lado a lado em dimensões como taxas, cashback, custódia, KYC, regiões disponíveis e moedas suportadas.

**URL:** https://neobankradar.xyz

**Marca mãe:** Powered by MOIC

---

## 2. Proposta de Valor

- **Comparação transparente:** Reunimos 44+ cartões cripto em um só lugar, com filtros avançados para encontrar o cartão ideal
- **Foco em privacidade e custódia:** Filtros exclusivos para nível de KYC (Required / Light / None) e modelo de custódia (Self-Custody vs Custodial)
- **Cobertura regional:** Filtros por região (Américas, Europa, APAC) e moeda (USD, EUR, GBP, INR, BRL)
- **Educação:** Seção de FAQ explicando o que são neobanks, neobanks cripto, stablecoins e adoção na América Latina
- **Comunidade:** Qualquer pessoa pode sugerir um novo cartão via formulário no site

---

## 3. Público-Alvo

| Segmento | Descrição |
|----------|-----------|
| **Crypto-nativos** | Usuários que já possuem criptomoedas e querem gastá-las no dia a dia com cartões |
| **Entusiastas de fintech** | Pessoas que acompanham inovações em serviços financeiros digitais |
| **Usuários de mercados emergentes** | Especialmente LATAM — pessoas buscando alternativas financeiras com stablecoins e acesso a USD |
| **Defensores de privacidade** | Usuários que valorizam self-custody e opções com KYC leve ou inexistente |
| **Participantes de DeFi** | Usuários que buscam cartões com yield, staking ou farming de airdrop |
| **Power users** | Pessoas comparando cashback alto, benefícios premium e cartões metal |

---

## 4. Funcionalidades Principais

### 4.1 Página Inicial (Radar)
- **Hero animado** com ícone de radar (animação Lottie) e tagline
- **Barra de filtros avançada:**
  - Busca por nome, emissor ou benefício
  - Toggle de KYC (Required / Light / None)
  - Toggle de Self-Custody
  - Dropdown de região e moeda
  - Ordenação: Destaque, A-Z, Maior Cashback, Mais Recente
- **Grid de cartões** responsivo (1-4 colunas conforme tela)
  - Cada cartão mostra: logo, nome, emissor, ano, cashback máximo, status de KYC
  - Badge "Airdrop" para cartões elegíveis a farming
- **Seção de FAQ** com acordeão por categorias
- **Botão "Add Neobank"** para submissões da comunidade

### 4.2 Página de Detalhes do Cartão (`/cards/[id]`)
- 8 fatos-chave: taxa anual, taxa FX, rede (Visa/Mastercard), custódia, regiões, ativos, metal, bônus de cadastro
- **Insights gerados automaticamente** (nível de cashback, modelo de custódia, privacidade, potencial de airdrop)
- Lista completa de benefícios/perks
- Link oficial para o site do cartão
- Dados estruturados (JSON-LD) para SEO

### 4.3 Página de FAQ (`/neobank-faq`)
- Duas categorias: "Entendendo Neobanks" e "Neobanks Cripto & Web3"
- 16+ perguntas e respostas educativas

---

## 5. Cartões Listados (Exemplos)

O radar inclui 44+ cartões de emissores como:

**Tier 1 (grandes players):** Coinbase, Binance, Crypto.com, Bybit, Gemini, MetaMask, Bitpanda, Nexo

**Tier 2 (emergentes/nichados):** Kast, Kripicard, Wirex, BitPay, COCA, Plutus, Fold, Ledger, RedotPay

**Tier 3 (Web3-nativos):** Ether.fi, Gnosis, Bleap, Cypher, Fiat24, THORWallet, SafePal, imToken

Cada cartão tem dados detalhados: tipo (crédito/débito/pré-pago), rede, cashback min/max, taxa anual, taxa FX, custódia, regiões, KYC, moedas suportadas, ativos cripto, se tem cartão metal, bônus de cadastro e elegibilidade a airdrop.

---

## 6. Identidade Visual

| Elemento | Valor |
|----------|-------|
| **Cor primária (fundo)** | Navy escuro `#040612` |
| **Cor de superfície** | `#0A0E24` |
| **Cor de destaque** | Azul `#2A60FB` |
| **Cor de sucesso/badge** | Verde `#00ED4F` |
| **Fonte display** | Clash Grotesk (títulos) |
| **Fonte body** | Sora (texto geral) |
| **Estilo geral** | Dark mode, minimalista, tech-forward |
| **Interações** | Hover com glow azul, transições suaves 300ms |

---

## 7. SEO e Presença Digital

### Palavras-chave alvo
`crypto card`, `crypto debit card`, `crypto credit card`, `neobank`, `neobank comparison`, `crypto cashback`, `bitcoin card`, `crypto visa`, `crypto mastercard`, `self-custody card`, `DeFi card`, `Web3 card`, `crypto rewards`, `digital bank`, `fintech card`

### Dados estruturados implementados
- **Organization** (nome, URL, logo, descrição)
- **WebSite** (nome, URL)
- **ItemList** (44+ cartões com posição e URL)
- **FinancialProduct** (por página de cartão)
- **Breadcrumb** (navegação)
- **FAQ** (perguntas e respostas)

### Meta description padrão
> "Compare fees, cashback, perks and custody models across 40+ crypto debit and credit cards. Find the best neobank card for your needs."

---

## 8. Redes Sociais e Contato

| Canal | Presença |
|-------|----------|
| **X (Twitter)** | Link no footer |
| **LinkedIn** | Link no footer |
| **Telegram** | Link no footer |

---

## 9. Diferenciais Competitivos

1. **Filtro de custódia** — Único comparador que destaca self-custody vs custodial como filtro principal
2. **Filtro de KYC** — Transparência sobre requisitos de verificação (Required / Light / None)
3. **Foco em airdrop farming** — Badge e filtro para cartões com potencial de airdrop
4. **Cobertura LATAM** — Suporte a BRL e filtro por região Américas
5. **Educação integrada** — FAQ robusto sobre neobanks e cripto
6. **Dados atualizados** — Fonte de dados via Google Sheets com atualização a cada hora
7. **Open submission** — Comunidade pode sugerir novos cartões

---

## 10. Tom de Voz e Comunicação

- **Informativo e objetivo** — Foco em dados comparativos, não em opinião
- **Tech-savvy mas acessível** — Usa termos cripto mas explica conceitos na FAQ
- **Neutro** — Não recomenda cartões específicos, apresenta fatos para o usuário decidir
- **Conciso** — Textos curtos, informação densa, sem fluff
- **Inglês** — Todo o conteúdo do site é em inglês (público global)

---

## 11. Métricas e Números para Comunicação

Use estes dados em materiais de marketing:

- **44+ cartões** comparados
- **8+ dimensões** de comparação por cartão
- **9 filtros** avançados de busca
- **4 modelos** de custódia rastreados (Custodial, Self-Custody, Non-Custodial, Hybrid)
- **3 níveis** de KYC mapeados
- **5 moedas** suportadas para filtro (USD, EUR, GBP, INR, BRL)
- **4 regiões** cobertas (Américas, Europa, APAC, Outras)
- **16+ FAQs** educativas

---

## 12. Casos de Uso para Conteúdo

### Ideias de conteúdo que o marketing pode explorar:

1. **"Os melhores cartões cripto com cashback acima de 5%"** — Filtrar por top cashback
2. **"Cartões cripto sem KYC em 2026"** — Filtrar por KYC None
3. **"Self-custody vs Custodial: qual cartão cripto escolher?"** — Conteúdo educativo usando os filtros
4. **"Melhores cartões cripto para quem mora na América Latina"** — Filtrar por região Américas + BRL
5. **"Cartões com potencial de airdrop farming"** — Destacar badge de airdrop
6. **"Comparação: Coinbase Card vs Crypto.com vs Binance Card"** — Head-to-head usando dados do radar
7. **"O que é um neobank cripto?"** — Referenciar FAQ do site
8. **"Cartões metal cripto: vale a pena?"** — Filtrar por cartões metal
9. **"Guia completo de cartões Visa cripto"** — Filtrar por rede Visa

---

## 13. Instruções para o ChatGPT

Ao usar este contexto com ChatGPT, você pode pedir:

- **Copy para redes sociais:** "Crie 5 posts para Twitter sobre o Neobank Radar focando em [tema]"
- **Blog posts:** "Escreva um artigo sobre os melhores cartões cripto sem KYC, usando dados do Neobank Radar"
- **Email marketing:** "Crie um email de lançamento apresentando o Neobank Radar para entusiastas de cripto"
- **Comparações:** "Monte uma comparação entre Coinbase Card e Crypto.com Card usando as dimensões do radar"
- **SEO:** "Sugira títulos e meta descriptions para páginas de categoria no Neobank Radar"
- **FAQ:** "Expanda as FAQs existentes com novas perguntas sobre [tema]"
- **Landing pages:** "Crie copy para uma landing page focada em usuários LATAM"

### Contexto adicional importante:
- O site é **em inglês** (público global), mas o marketing pode ser em qualquer idioma
- A marca **MOIC** é a empresa por trás do produto
- O foco é ser **neutro e informativo**, não vender cartões específicos
- Privacidade e transparência são valores centrais da marca
