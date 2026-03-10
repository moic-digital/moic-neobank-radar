import type { FaqCategory } from "@/types/faq"

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    title: "Understanding Neobanks",
    items: [
      {
        question: "What is a neobank?",
        answer:
          "A neobank is a digital-first financial institution that operates entirely online without physical branches. Unlike traditional banks that added mobile apps to legacy infrastructure, neobanks were built from scratch using modern cloud systems and mobile interfaces. This allows them to offer faster onboarding, lower fees, and a more streamlined banking experience through smartphones.",
      },
      {
        question: "How do neobanks work?",
        answer:
          "Neobanks operate through mobile apps and web platforms that provide banking services digitally. Most neobanks partner with licensed banks for regulatory compliance and deposit protection while managing the user interface, customer experience, and digital infrastructure themselves.",
      },
      {
        question: "What services do neobanks typically offer?",
        answer:
          "Most neobanks provide core financial services such as digital bank accounts, debit or credit cards, international transfers, budgeting tools, savings or yield accounts, and cashback and rewards programs. These services are typically managed entirely through a mobile application.",
      },
      {
        question: "Why are neobanks growing so quickly?",
        answer:
          "Neobanks are growing rapidly because they provide faster, cheaper, and more user-friendly financial services than traditional banks. Digital infrastructure dramatically reduces operating costs, enabling neobanks to offer free accounts, lower fees, and better customer experiences. This model has helped companies like Nubank, Revolut, and Chime reach tens of millions of users globally.",
      },
      {
        question: "How are neobanks different from traditional banks?",
        answer:
          "The key difference is infrastructure and operating model. Traditional banks run on legacy systems developed decades ago, while neobanks use modern cloud-native architecture and APIs that allow faster product development, lower costs, and more flexible financial services.",
      },
      {
        question: "Are neobanks regulated?",
        answer:
          "Yes. Most neobanks operate within existing financial regulations. Many partner with licensed banks that provide regulatory coverage, deposit insurance, and compliance frameworks while the neobank manages the digital experience and product layer.",
      },
      {
        question: "Why are neobanks especially popular in emerging markets?",
        answer:
          "Neobanks grow quickly in emerging markets because many people lack access to traditional banking services. Regions with large unbanked populations, high smartphone adoption, and inefficient banking systems often experience rapid adoption of digital financial platforms.",
      },
      {
        question: "What are some well-known neobanks?",
        answer:
          "Some of the most recognized neobanks globally include Nubank, Revolut, Chime, Monzo, and N26. These companies demonstrated that digital-only banks can scale to tens or hundreds of millions of users worldwide.",
      },
    ],
  },
  {
    title: "Crypto & Web3 Neobanks",
    items: [
      {
        question: "What is a crypto neobank?",
        answer:
          "A crypto neobank is a digital banking platform that integrates cryptocurrency infrastructure into financial services. These platforms combine traditional banking features with blockchain technologies such as stablecoin accounts, crypto payments, and decentralized financial services.",
      },
      {
        question: "How are crypto neobanks different from traditional neobanks?",
        answer:
          "Traditional neobanks operate entirely within the fiat banking system, while crypto neobanks integrate blockchain networks and digital assets into their financial infrastructure. This allows features like stablecoin savings, cross-border payments, and decentralized finance integrations.",
      },
      {
        question: "What role do stablecoins play in crypto neobanks?",
        answer:
          "Stablecoins often serve as the core financial infrastructure for crypto neobanks. They allow users to hold digital dollars, send cross-border payments instantly, and avoid volatility typically associated with cryptocurrencies like Bitcoin or Ethereum.",
      },
      {
        question: "Why are stablecoins widely used in Latin America?",
        answer:
          "In several Latin American countries, stablecoins are used as a digital alternative to unstable local currencies. In some markets across the region, stablecoins represent 50\u201390% of crypto transactions, often used to preserve purchasing power or send international transfers.",
      },
      {
        question: "Why is Latin America a key region for crypto neobanks?",
        answer:
          "Latin America has several structural conditions that favor crypto-based financial services: high inflation in certain countries, large remittance flows, millions of unbanked citizens, strong smartphone adoption, and growing crypto usage. These factors create demand for digital dollar accounts and blockchain-based financial services.",
      },
      {
        question: "Are crypto neobanks replacing traditional banks?",
        answer:
          "Crypto neobanks are not replacing traditional banks yet, but they represent a new financial layer built on blockchain infrastructure. Many experts see them as a bridge between traditional banking systems and decentralized financial networks.",
      },
    ],
  },
  {
    title: "About Neobank Radar",
    items: [
      {
        question: "What is Neobank Radar?",
        answer:
          "Neobank Radar is a comparison platform for crypto cards and digital banking products. The platform aggregates information about dozens of financial products and allows users to compare features such as cashback, fees, custody models, supported assets, and regional availability.",
      },
      {
        question: "What can you compare on Neobank Radar?",
        answer:
          "Neobank Radar allows users to compare financial products based on attributes such as card type (debit, credit, prepaid), cashback rates, annual fees, foreign exchange fees, custody model, KYC requirements, supported assets and currencies, and geographic availability. These attributes help users evaluate different products side by side.",
      },
      {
        question: "How many crypto cards are listed on Neobank Radar?",
        answer:
          "Neobank Radar currently tracks 40+ crypto cards from major exchanges, wallets, and fintech companies. Examples include products from platforms such as Coinbase, Binance, Crypto.com, Bitpanda, and others.",
      },
      {
        question: "Where does Neobank Radar get its data?",
        answer:
          "The platform collects product data from a structured database maintained by the team. Information about each card \u2014 such as fees, supported assets, and regional availability \u2014 is compiled from official sources and organized into a standardized dataset.",
      },
      {
        question: "How can Neobank Radar help users choose a crypto card?",
        answer:
          "Neobank Radar helps users quickly compare multiple products in one place. Instead of researching each product individually, users can filter cards based on region, KYC requirements, custody models, or rewards programs.",
      },
      {
        question: "Who created Neobank Radar?",
        answer:
          "Neobank Radar was created by MOIC Digital, a company focused on research, strategy, and marketing for Web3 companies. The project aims to map the emerging ecosystem of crypto-enabled financial services and make it easier for users to explore new financial products.",
      },
    ],
  },
]

export function getAllFaqItems() {
  return FAQ_CATEGORIES.flatMap((category) => category.items)
}
