import type { HierarchyNode } from "./regionTypes"

// =============================================================================
// REGION HIERARCHY
// 4-level hierarchy: super_region → region → sub_region → country
// =============================================================================

export const REGION_HIERARCHY: Readonly<Record<string, HierarchyNode>> = {

  // ===========================================================================
  // LEVEL 1 — SUPER REGIONS
  // ===========================================================================

  americas: {
    label: "Americas",
    type: "super_region",
    parents: [],
  },

  europe: {
    label: "Europe",
    type: "super_region",
    parents: [],
  },

  apac: {
    label: "Asia Pacific",
    type: "super_region",
    parents: [],
  },

  middle_east_africa: {
    label: "Middle East & Africa",
    type: "super_region",
    parents: [],
  },

  cis: {
    label: "CIS",
    type: "super_region",
    parents: [],
  },

  // ===========================================================================
  // LEVEL 2 — REGIONS
  // ===========================================================================

  // Americas
  north_america: {
    label: "North America",
    type: "region",
    parents: ["americas"],
  },

  central_america: {
    label: "Central America",
    type: "region",
    parents: ["americas"],
  },

  caribbean: {
    label: "Caribbean",
    type: "region",
    parents: ["americas"],
  },

  south_america: {
    label: "South America",
    type: "region",
    parents: ["americas"],
  },

  // Europe
  western_europe: {
    label: "Western Europe",
    type: "region",
    parents: ["europe"],
  },

  eastern_europe: {
    label: "Eastern Europe",
    type: "region",
    parents: ["europe"],
  },

  northern_europe: {
    label: "Northern Europe",
    type: "region",
    parents: ["europe"],
  },

  southern_europe: {
    label: "Southern Europe",
    type: "region",
    parents: ["europe"],
  },

  // Asia Pacific
  east_asia: {
    label: "East Asia",
    type: "region",
    parents: ["apac"],
  },

  southeast_asia: {
    label: "Southeast Asia",
    type: "region",
    parents: ["apac"],
  },

  south_asia: {
    label: "South Asia",
    type: "region",
    parents: ["apac"],
  },

  oceania: {
    label: "Oceania",
    type: "region",
    parents: ["apac"],
  },

  // Middle East & Africa
  sub_saharan_africa: {
    label: "Sub-Saharan Africa",
    type: "region",
    parents: ["middle_east_africa"],
  },

  north_africa: {
    label: "North Africa",
    type: "region",
    parents: ["middle_east_africa"],
  },

  middle_east: {
    label: "Middle East",
    type: "region",
    parents: ["middle_east_africa"],
  },

  // CIS
  central_asia: {
    label: "Central Asia",
    type: "region",
    parents: ["cis"],
  },

  // ===========================================================================
  // LEVEL 3 — SUB-REGIONS
  // ===========================================================================

  nordic: {
    label: "Nordic Countries",
    type: "sub_region",
    parents: ["northern_europe", "europe"],
  },

  dach: {
    label: "DACH",
    type: "sub_region",
    parents: ["western_europe", "europe"],
  },

  benelux: {
    label: "Benelux",
    type: "sub_region",
    parents: ["western_europe", "europe"],
  },

  baltic: {
    label: "Baltic States",
    type: "sub_region",
    parents: ["northern_europe", "europe"],
  },

  // MENA spans middle_east and north_africa
  mena: {
    label: "MENA",
    type: "sub_region",
    parents: ["middle_east", "north_africa", "middle_east_africa"],
  },

  gcc: {
    label: "GCC",
    type: "sub_region",
    parents: ["middle_east", "middle_east_africa"],
  },

  // EEA — European Economic Area (cross-cutting sub_region under europe)
  eea: {
    label: "EEA",
    type: "sub_region",
    parents: ["europe"],
  },

  // LATAM — Latin America (cross-cutting sub_region under americas)
  latam: {
    label: "LATAM",
    type: "sub_region",
    parents: ["americas"],
  },

  // ASEAN — Association of Southeast Asian Nations
  asean: {
    label: "ASEAN",
    type: "sub_region",
    parents: ["southeast_asia", "apac"],
  },

  // ===========================================================================
  // LEVEL 4 — COUNTRIES
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // NORTH AMERICA
  // ---------------------------------------------------------------------------

  united_states: {
    label: "United States",
    type: "country",
    isoAlpha2: "US",
    isoAlpha3: "USA",
    parents: ["north_america", "americas"],
  },

  canada: {
    label: "Canada",
    type: "country",
    isoAlpha2: "CA",
    isoAlpha3: "CAN",
    parents: ["north_america", "americas"],
  },

  // Mexico: geographically North America but culturally/politically LATAM
  mexico: {
    label: "Mexico",
    type: "country",
    isoAlpha2: "MX",
    isoAlpha3: "MEX",
    parents: ["north_america", "latam", "americas"],
  },

  // ---------------------------------------------------------------------------
  // CENTRAL AMERICA
  // ---------------------------------------------------------------------------

  guatemala: {
    label: "Guatemala",
    type: "country",
    isoAlpha2: "GT",
    isoAlpha3: "GTM",
    parents: ["central_america", "latam", "americas"],
  },

  belize: {
    label: "Belize",
    type: "country",
    isoAlpha2: "BZ",
    isoAlpha3: "BLZ",
    parents: ["central_america", "latam", "americas"],
  },

  honduras: {
    label: "Honduras",
    type: "country",
    isoAlpha2: "HN",
    isoAlpha3: "HND",
    parents: ["central_america", "latam", "americas"],
  },

  el_salvador: {
    label: "El Salvador",
    type: "country",
    isoAlpha2: "SV",
    isoAlpha3: "SLV",
    parents: ["central_america", "latam", "americas"],
  },

  nicaragua: {
    label: "Nicaragua",
    type: "country",
    isoAlpha2: "NI",
    isoAlpha3: "NIC",
    parents: ["central_america", "latam", "americas"],
  },

  costa_rica: {
    label: "Costa Rica",
    type: "country",
    isoAlpha2: "CR",
    isoAlpha3: "CRI",
    parents: ["central_america", "latam", "americas"],
  },

  panama: {
    label: "Panama",
    type: "country",
    isoAlpha2: "PA",
    isoAlpha3: "PAN",
    parents: ["central_america", "latam", "americas"],
  },

  // ---------------------------------------------------------------------------
  // CARIBBEAN
  // ---------------------------------------------------------------------------

  cuba: {
    label: "Cuba",
    type: "country",
    isoAlpha2: "CU",
    isoAlpha3: "CUB",
    parents: ["caribbean", "latam", "americas"],
  },

  haiti: {
    label: "Haiti",
    type: "country",
    isoAlpha2: "HT",
    isoAlpha3: "HTI",
    parents: ["caribbean", "latam", "americas"],
  },

  dominican_republic: {
    label: "Dominican Republic",
    type: "country",
    isoAlpha2: "DO",
    isoAlpha3: "DOM",
    parents: ["caribbean", "latam", "americas"],
  },

  jamaica: {
    label: "Jamaica",
    type: "country",
    isoAlpha2: "JM",
    isoAlpha3: "JAM",
    parents: ["caribbean", "latam", "americas"],
  },

  trinidad_and_tobago: {
    label: "Trinidad and Tobago",
    type: "country",
    isoAlpha2: "TT",
    isoAlpha3: "TTO",
    parents: ["caribbean", "latam", "americas"],
  },

  bahamas: {
    label: "Bahamas",
    type: "country",
    isoAlpha2: "BS",
    isoAlpha3: "BHS",
    parents: ["caribbean", "latam", "americas"],
  },

  barbados: {
    label: "Barbados",
    type: "country",
    isoAlpha2: "BB",
    isoAlpha3: "BRB",
    parents: ["caribbean", "latam", "americas"],
  },

  saint_lucia: {
    label: "Saint Lucia",
    type: "country",
    isoAlpha2: "LC",
    isoAlpha3: "LCA",
    parents: ["caribbean", "latam", "americas"],
  },

  grenada: {
    label: "Grenada",
    type: "country",
    isoAlpha2: "GD",
    isoAlpha3: "GRD",
    parents: ["caribbean", "latam", "americas"],
  },

  saint_vincent_and_the_grenadines: {
    label: "Saint Vincent and the Grenadines",
    type: "country",
    isoAlpha2: "VC",
    isoAlpha3: "VCT",
    parents: ["caribbean", "latam", "americas"],
  },

  antigua_and_barbuda: {
    label: "Antigua and Barbuda",
    type: "country",
    isoAlpha2: "AG",
    isoAlpha3: "ATG",
    parents: ["caribbean", "latam", "americas"],
  },

  dominica: {
    label: "Dominica",
    type: "country",
    isoAlpha2: "DM",
    isoAlpha3: "DMA",
    parents: ["caribbean", "latam", "americas"],
  },

  saint_kitts_and_nevis: {
    label: "Saint Kitts and Nevis",
    type: "country",
    isoAlpha2: "KN",
    isoAlpha3: "KNA",
    parents: ["caribbean", "latam", "americas"],
  },

  // ---------------------------------------------------------------------------
  // SOUTH AMERICA
  // ---------------------------------------------------------------------------

  brazil: {
    label: "Brazil",
    type: "country",
    isoAlpha2: "BR",
    isoAlpha3: "BRA",
    parents: ["south_america", "latam", "americas"],
  },

  argentina: {
    label: "Argentina",
    type: "country",
    isoAlpha2: "AR",
    isoAlpha3: "ARG",
    parents: ["south_america", "latam", "americas"],
  },

  colombia: {
    label: "Colombia",
    type: "country",
    isoAlpha2: "CO",
    isoAlpha3: "COL",
    parents: ["south_america", "latam", "americas"],
  },

  peru: {
    label: "Peru",
    type: "country",
    isoAlpha2: "PE",
    isoAlpha3: "PER",
    parents: ["south_america", "latam", "americas"],
  },

  venezuela: {
    label: "Venezuela",
    type: "country",
    isoAlpha2: "VE",
    isoAlpha3: "VEN",
    parents: ["south_america", "latam", "americas"],
  },

  chile: {
    label: "Chile",
    type: "country",
    isoAlpha2: "CL",
    isoAlpha3: "CHL",
    parents: ["south_america", "latam", "americas"],
  },

  ecuador: {
    label: "Ecuador",
    type: "country",
    isoAlpha2: "EC",
    isoAlpha3: "ECU",
    parents: ["south_america", "latam", "americas"],
  },

  bolivia: {
    label: "Bolivia",
    type: "country",
    isoAlpha2: "BO",
    isoAlpha3: "BOL",
    parents: ["south_america", "latam", "americas"],
  },

  paraguay: {
    label: "Paraguay",
    type: "country",
    isoAlpha2: "PY",
    isoAlpha3: "PRY",
    parents: ["south_america", "latam", "americas"],
  },

  uruguay: {
    label: "Uruguay",
    type: "country",
    isoAlpha2: "UY",
    isoAlpha3: "URY",
    parents: ["south_america", "latam", "americas"],
  },

  guyana: {
    label: "Guyana",
    type: "country",
    isoAlpha2: "GY",
    isoAlpha3: "GUY",
    parents: ["south_america", "latam", "americas"],
  },

  suriname: {
    label: "Suriname",
    type: "country",
    isoAlpha2: "SR",
    isoAlpha3: "SUR",
    parents: ["south_america", "latam", "americas"],
  },

  // ---------------------------------------------------------------------------
  // WESTERN EUROPE
  // ---------------------------------------------------------------------------

  // Germany — also dach and eea
  germany: {
    label: "Germany",
    type: "country",
    isoAlpha2: "DE",
    isoAlpha3: "DEU",
    parents: ["western_europe", "dach", "eea", "europe"],
  },

  // France — also eea
  france: {
    label: "France",
    type: "country",
    isoAlpha2: "FR",
    isoAlpha3: "FRA",
    parents: ["western_europe", "eea", "europe"],
  },

  // Netherlands — also benelux, eea
  netherlands: {
    label: "Netherlands",
    type: "country",
    isoAlpha2: "NL",
    isoAlpha3: "NLD",
    parents: ["western_europe", "benelux", "eea", "europe"],
  },

  // Belgium — also benelux, eea
  belgium: {
    label: "Belgium",
    type: "country",
    isoAlpha2: "BE",
    isoAlpha3: "BEL",
    parents: ["western_europe", "benelux", "eea", "europe"],
  },

  // Luxembourg — also benelux, eea
  luxembourg: {
    label: "Luxembourg",
    type: "country",
    isoAlpha2: "LU",
    isoAlpha3: "LUX",
    parents: ["western_europe", "benelux", "eea", "europe"],
  },

  // Austria — also dach, eea
  austria: {
    label: "Austria",
    type: "country",
    isoAlpha2: "AT",
    isoAlpha3: "AUT",
    parents: ["western_europe", "dach", "eea", "europe"],
  },

  // Switzerland — also dach but NOT in EEA
  switzerland: {
    label: "Switzerland",
    type: "country",
    isoAlpha2: "CH",
    isoAlpha3: "CHE",
    parents: ["western_europe", "dach", "europe"],
  },

  // Ireland — also eea
  ireland: {
    label: "Ireland",
    type: "country",
    isoAlpha2: "IE",
    isoAlpha3: "IRL",
    parents: ["western_europe", "eea", "europe"],
  },

  monaco: {
    label: "Monaco",
    type: "country",
    isoAlpha2: "MC",
    isoAlpha3: "MCO",
    parents: ["western_europe", "europe"],
  },

  // Liechtenstein — also eea
  liechtenstein: {
    label: "Liechtenstein",
    type: "country",
    isoAlpha2: "LI",
    isoAlpha3: "LIE",
    parents: ["western_europe", "eea", "europe"],
  },

  // ---------------------------------------------------------------------------
  // NORTHERN EUROPE
  // ---------------------------------------------------------------------------

  united_kingdom: {
    label: "United Kingdom",
    type: "country",
    isoAlpha2: "GB",
    isoAlpha3: "GBR",
    parents: ["northern_europe", "europe"],
  },

  // Sweden — also nordic, eea
  sweden: {
    label: "Sweden",
    type: "country",
    isoAlpha2: "SE",
    isoAlpha3: "SWE",
    parents: ["northern_europe", "nordic", "eea", "europe"],
  },

  // Denmark — also nordic, eea
  denmark: {
    label: "Denmark",
    type: "country",
    isoAlpha2: "DK",
    isoAlpha3: "DNK",
    parents: ["northern_europe", "nordic", "eea", "europe"],
  },

  // Finland — also nordic, eea
  finland: {
    label: "Finland",
    type: "country",
    isoAlpha2: "FI",
    isoAlpha3: "FIN",
    parents: ["northern_europe", "nordic", "eea", "europe"],
  },

  // Norway — also nordic, eea
  norway: {
    label: "Norway",
    type: "country",
    isoAlpha2: "NO",
    isoAlpha3: "NOR",
    parents: ["northern_europe", "nordic", "eea", "europe"],
  },

  // Iceland — also nordic, eea
  iceland: {
    label: "Iceland",
    type: "country",
    isoAlpha2: "IS",
    isoAlpha3: "ISL",
    parents: ["northern_europe", "nordic", "eea", "europe"],
  },

  // Estonia — also baltic, eea
  estonia: {
    label: "Estonia",
    type: "country",
    isoAlpha2: "EE",
    isoAlpha3: "EST",
    parents: ["northern_europe", "baltic", "eea", "europe"],
  },

  // Latvia — also baltic, eea
  latvia: {
    label: "Latvia",
    type: "country",
    isoAlpha2: "LV",
    isoAlpha3: "LVA",
    parents: ["northern_europe", "baltic", "eea", "europe"],
  },

  // Lithuania — also baltic, eea
  lithuania: {
    label: "Lithuania",
    type: "country",
    isoAlpha2: "LT",
    isoAlpha3: "LTU",
    parents: ["northern_europe", "baltic", "eea", "europe"],
  },

  // ---------------------------------------------------------------------------
  // SOUTHERN EUROPE
  // ---------------------------------------------------------------------------

  // Italy — also eea
  italy: {
    label: "Italy",
    type: "country",
    isoAlpha2: "IT",
    isoAlpha3: "ITA",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Spain — also eea
  spain: {
    label: "Spain",
    type: "country",
    isoAlpha2: "ES",
    isoAlpha3: "ESP",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Portugal — also eea
  portugal: {
    label: "Portugal",
    type: "country",
    isoAlpha2: "PT",
    isoAlpha3: "PRT",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Greece — also eea
  greece: {
    label: "Greece",
    type: "country",
    isoAlpha2: "GR",
    isoAlpha3: "GRC",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Croatia — also eea
  croatia: {
    label: "Croatia",
    type: "country",
    isoAlpha2: "HR",
    isoAlpha3: "HRV",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Slovenia — also eea
  slovenia: {
    label: "Slovenia",
    type: "country",
    isoAlpha2: "SI",
    isoAlpha3: "SVN",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Malta — also eea
  malta: {
    label: "Malta",
    type: "country",
    isoAlpha2: "MT",
    isoAlpha3: "MLT",
    parents: ["southern_europe", "eea", "europe"],
  },

  // Cyprus — also eea
  cyprus: {
    label: "Cyprus",
    type: "country",
    isoAlpha2: "CY",
    isoAlpha3: "CYP",
    parents: ["southern_europe", "eea", "europe"],
  },

  andorra: {
    label: "Andorra",
    type: "country",
    isoAlpha2: "AD",
    isoAlpha3: "AND",
    parents: ["southern_europe", "europe"],
  },

  san_marino: {
    label: "San Marino",
    type: "country",
    isoAlpha2: "SM",
    isoAlpha3: "SMR",
    parents: ["southern_europe", "europe"],
  },

  vatican_city: {
    label: "Vatican City",
    type: "country",
    isoAlpha2: "VA",
    isoAlpha3: "VAT",
    parents: ["southern_europe", "europe"],
  },

  north_macedonia: {
    label: "North Macedonia",
    type: "country",
    isoAlpha2: "MK",
    isoAlpha3: "MKD",
    parents: ["southern_europe", "europe"],
  },

  albania: {
    label: "Albania",
    type: "country",
    isoAlpha2: "AL",
    isoAlpha3: "ALB",
    parents: ["southern_europe", "europe"],
  },

  montenegro: {
    label: "Montenegro",
    type: "country",
    isoAlpha2: "ME",
    isoAlpha3: "MNE",
    parents: ["southern_europe", "europe"],
  },

  bosnia_and_herzegovina: {
    label: "Bosnia and Herzegovina",
    type: "country",
    isoAlpha2: "BA",
    isoAlpha3: "BIH",
    parents: ["southern_europe", "europe"],
  },

  serbia: {
    label: "Serbia",
    type: "country",
    isoAlpha2: "RS",
    isoAlpha3: "SRB",
    parents: ["southern_europe", "europe"],
  },

  // ---------------------------------------------------------------------------
  // EASTERN EUROPE
  // ---------------------------------------------------------------------------

  // Poland — also eea
  poland: {
    label: "Poland",
    type: "country",
    isoAlpha2: "PL",
    isoAlpha3: "POL",
    parents: ["eastern_europe", "eea", "europe"],
  },

  // Czech Republic (Czechia) — also eea
  czech_republic: {
    label: "Czech Republic",
    type: "country",
    isoAlpha2: "CZ",
    isoAlpha3: "CZE",
    parents: ["eastern_europe", "eea", "europe"],
  },

  // Romania — also eea
  romania: {
    label: "Romania",
    type: "country",
    isoAlpha2: "RO",
    isoAlpha3: "ROU",
    parents: ["eastern_europe", "eea", "europe"],
  },

  // Hungary — also eea
  hungary: {
    label: "Hungary",
    type: "country",
    isoAlpha2: "HU",
    isoAlpha3: "HUN",
    parents: ["eastern_europe", "eea", "europe"],
  },

  // Slovakia — also eea
  slovakia: {
    label: "Slovakia",
    type: "country",
    isoAlpha2: "SK",
    isoAlpha3: "SVK",
    parents: ["eastern_europe", "eea", "europe"],
  },

  // Bulgaria — also eea
  bulgaria: {
    label: "Bulgaria",
    type: "country",
    isoAlpha2: "BG",
    isoAlpha3: "BGR",
    parents: ["eastern_europe", "eea", "europe"],
  },

  ukraine: {
    label: "Ukraine",
    type: "country",
    isoAlpha2: "UA",
    isoAlpha3: "UKR",
    parents: ["eastern_europe", "europe"],
  },

  moldova: {
    label: "Moldova",
    type: "country",
    isoAlpha2: "MD",
    isoAlpha3: "MDA",
    parents: ["eastern_europe", "europe"],
  },

  belarus: {
    label: "Belarus",
    type: "country",
    isoAlpha2: "BY",
    isoAlpha3: "BLR",
    parents: ["eastern_europe", "europe"],
  },

  // ---------------------------------------------------------------------------
  // EAST ASIA
  // ---------------------------------------------------------------------------

  china: {
    label: "China",
    type: "country",
    isoAlpha2: "CN",
    isoAlpha3: "CHN",
    parents: ["east_asia", "apac"],
  },

  japan: {
    label: "Japan",
    type: "country",
    isoAlpha2: "JP",
    isoAlpha3: "JPN",
    parents: ["east_asia", "apac"],
  },

  south_korea: {
    label: "South Korea",
    type: "country",
    isoAlpha2: "KR",
    isoAlpha3: "KOR",
    parents: ["east_asia", "apac"],
  },

  north_korea: {
    label: "North Korea",
    type: "country",
    isoAlpha2: "KP",
    isoAlpha3: "PRK",
    parents: ["east_asia", "apac"],
  },

  mongolia: {
    label: "Mongolia",
    type: "country",
    isoAlpha2: "MN",
    isoAlpha3: "MNG",
    parents: ["east_asia", "apac"],
  },

  // Geopolitical status: Not a UN member state; self-governing territory.
  // Included for practical coverage.
  taiwan: {
    label: "Taiwan",
    type: "country",
    isoAlpha2: "TW",
    isoAlpha3: "TWN",
    parents: ["east_asia", "apac"],
  },

  // ---------------------------------------------------------------------------
  // SOUTHEAST ASIA
  // ---------------------------------------------------------------------------

  // Indonesia — also asean
  indonesia: {
    label: "Indonesia",
    type: "country",
    isoAlpha2: "ID",
    isoAlpha3: "IDN",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Thailand — also asean
  thailand: {
    label: "Thailand",
    type: "country",
    isoAlpha2: "TH",
    isoAlpha3: "THA",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Vietnam — also asean
  vietnam: {
    label: "Vietnam",
    type: "country",
    isoAlpha2: "VN",
    isoAlpha3: "VNM",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Philippines — also asean
  philippines: {
    label: "Philippines",
    type: "country",
    isoAlpha2: "PH",
    isoAlpha3: "PHL",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Malaysia — also asean
  malaysia: {
    label: "Malaysia",
    type: "country",
    isoAlpha2: "MY",
    isoAlpha3: "MYS",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Singapore — also asean
  singapore: {
    label: "Singapore",
    type: "country",
    isoAlpha2: "SG",
    isoAlpha3: "SGP",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Myanmar — also asean
  myanmar: {
    label: "Myanmar",
    type: "country",
    isoAlpha2: "MM",
    isoAlpha3: "MMR",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Cambodia — also asean
  cambodia: {
    label: "Cambodia",
    type: "country",
    isoAlpha2: "KH",
    isoAlpha3: "KHM",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Laos — also asean
  laos: {
    label: "Laos",
    type: "country",
    isoAlpha2: "LA",
    isoAlpha3: "LAO",
    parents: ["southeast_asia", "asean", "apac"],
  },

  // Brunei — also asean
  brunei: {
    label: "Brunei",
    type: "country",
    isoAlpha2: "BN",
    isoAlpha3: "BRN",
    parents: ["southeast_asia", "asean", "apac"],
  },

  timor_leste: {
    label: "Timor-Leste",
    type: "country",
    isoAlpha2: "TL",
    isoAlpha3: "TLS",
    parents: ["southeast_asia", "apac"],
  },

  // ---------------------------------------------------------------------------
  // SOUTH ASIA
  // ---------------------------------------------------------------------------

  india: {
    label: "India",
    type: "country",
    isoAlpha2: "IN",
    isoAlpha3: "IND",
    parents: ["south_asia", "apac"],
  },

  pakistan: {
    label: "Pakistan",
    type: "country",
    isoAlpha2: "PK",
    isoAlpha3: "PAK",
    parents: ["south_asia", "apac"],
  },

  bangladesh: {
    label: "Bangladesh",
    type: "country",
    isoAlpha2: "BD",
    isoAlpha3: "BGD",
    parents: ["south_asia", "apac"],
  },

  sri_lanka: {
    label: "Sri Lanka",
    type: "country",
    isoAlpha2: "LK",
    isoAlpha3: "LKA",
    parents: ["south_asia", "apac"],
  },

  nepal: {
    label: "Nepal",
    type: "country",
    isoAlpha2: "NP",
    isoAlpha3: "NPL",
    parents: ["south_asia", "apac"],
  },

  bhutan: {
    label: "Bhutan",
    type: "country",
    isoAlpha2: "BT",
    isoAlpha3: "BTN",
    parents: ["south_asia", "apac"],
  },

  maldives: {
    label: "Maldives",
    type: "country",
    isoAlpha2: "MV",
    isoAlpha3: "MDV",
    parents: ["south_asia", "apac"],
  },

  afghanistan: {
    label: "Afghanistan",
    type: "country",
    isoAlpha2: "AF",
    isoAlpha3: "AFG",
    parents: ["south_asia", "apac"],
  },

  // ---------------------------------------------------------------------------
  // OCEANIA
  // ---------------------------------------------------------------------------

  australia: {
    label: "Australia",
    type: "country",
    isoAlpha2: "AU",
    isoAlpha3: "AUS",
    parents: ["oceania", "apac"],
  },

  new_zealand: {
    label: "New Zealand",
    type: "country",
    isoAlpha2: "NZ",
    isoAlpha3: "NZL",
    parents: ["oceania", "apac"],
  },

  papua_new_guinea: {
    label: "Papua New Guinea",
    type: "country",
    isoAlpha2: "PG",
    isoAlpha3: "PNG",
    parents: ["oceania", "apac"],
  },

  fiji: {
    label: "Fiji",
    type: "country",
    isoAlpha2: "FJ",
    isoAlpha3: "FJI",
    parents: ["oceania", "apac"],
  },

  solomon_islands: {
    label: "Solomon Islands",
    type: "country",
    isoAlpha2: "SB",
    isoAlpha3: "SLB",
    parents: ["oceania", "apac"],
  },

  vanuatu: {
    label: "Vanuatu",
    type: "country",
    isoAlpha2: "VU",
    isoAlpha3: "VUT",
    parents: ["oceania", "apac"],
  },

  samoa: {
    label: "Samoa",
    type: "country",
    isoAlpha2: "WS",
    isoAlpha3: "WSM",
    parents: ["oceania", "apac"],
  },

  kiribati: {
    label: "Kiribati",
    type: "country",
    isoAlpha2: "KI",
    isoAlpha3: "KIR",
    parents: ["oceania", "apac"],
  },

  tonga: {
    label: "Tonga",
    type: "country",
    isoAlpha2: "TO",
    isoAlpha3: "TON",
    parents: ["oceania", "apac"],
  },

  micronesia: {
    label: "Micronesia",
    type: "country",
    isoAlpha2: "FM",
    isoAlpha3: "FSM",
    parents: ["oceania", "apac"],
  },

  palau: {
    label: "Palau",
    type: "country",
    isoAlpha2: "PW",
    isoAlpha3: "PLW",
    parents: ["oceania", "apac"],
  },

  marshall_islands: {
    label: "Marshall Islands",
    type: "country",
    isoAlpha2: "MH",
    isoAlpha3: "MHL",
    parents: ["oceania", "apac"],
  },

  tuvalu: {
    label: "Tuvalu",
    type: "country",
    isoAlpha2: "TV",
    isoAlpha3: "TUV",
    parents: ["oceania", "apac"],
  },

  nauru: {
    label: "Nauru",
    type: "country",
    isoAlpha2: "NR",
    isoAlpha3: "NRU",
    parents: ["oceania", "apac"],
  },

  // ---------------------------------------------------------------------------
  // MIDDLE EAST
  // ---------------------------------------------------------------------------

  // Saudi Arabia — also gcc, mena
  saudi_arabia: {
    label: "Saudi Arabia",
    type: "country",
    isoAlpha2: "SA",
    isoAlpha3: "SAU",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // United Arab Emirates — also gcc, mena
  united_arab_emirates: {
    label: "United Arab Emirates",
    type: "country",
    isoAlpha2: "AE",
    isoAlpha3: "ARE",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // Qatar — also gcc, mena
  qatar: {
    label: "Qatar",
    type: "country",
    isoAlpha2: "QA",
    isoAlpha3: "QAT",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // Kuwait — also gcc, mena
  kuwait: {
    label: "Kuwait",
    type: "country",
    isoAlpha2: "KW",
    isoAlpha3: "KWT",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // Bahrain — also gcc, mena
  bahrain: {
    label: "Bahrain",
    type: "country",
    isoAlpha2: "BH",
    isoAlpha3: "BHR",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // Oman — also gcc, mena
  oman: {
    label: "Oman",
    type: "country",
    isoAlpha2: "OM",
    isoAlpha3: "OMN",
    parents: ["middle_east", "gcc", "mena", "middle_east_africa"],
  },

  // Iraq — also mena
  iraq: {
    label: "Iraq",
    type: "country",
    isoAlpha2: "IQ",
    isoAlpha3: "IRQ",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Iran — also mena
  iran: {
    label: "Iran",
    type: "country",
    isoAlpha2: "IR",
    isoAlpha3: "IRN",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Israel — also mena
  israel: {
    label: "Israel",
    type: "country",
    isoAlpha2: "IL",
    isoAlpha3: "ISR",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Jordan — also mena
  jordan: {
    label: "Jordan",
    type: "country",
    isoAlpha2: "JO",
    isoAlpha3: "JOR",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Lebanon — also mena
  lebanon: {
    label: "Lebanon",
    type: "country",
    isoAlpha2: "LB",
    isoAlpha3: "LBN",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Syria — also mena
  syria: {
    label: "Syria",
    type: "country",
    isoAlpha2: "SY",
    isoAlpha3: "SYR",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Yemen — also mena
  yemen: {
    label: "Yemen",
    type: "country",
    isoAlpha2: "YE",
    isoAlpha3: "YEM",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Geopolitical status: UN observer state (non-member).
  // Recognized by 139 UN member states.
  palestine: {
    label: "Palestine",
    type: "country",
    isoAlpha2: "PS",
    isoAlpha3: "PSE",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // Turkey — also mena (spans Middle East and North Africa culturally)
  turkey: {
    label: "Turkey",
    type: "country",
    isoAlpha2: "TR",
    isoAlpha3: "TUR",
    parents: ["middle_east", "mena", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // NORTH AFRICA
  // ---------------------------------------------------------------------------

  // Egypt — also mena
  egypt: {
    label: "Egypt",
    type: "country",
    isoAlpha2: "EG",
    isoAlpha3: "EGY",
    parents: ["north_africa", "mena", "middle_east_africa"],
  },

  // Libya — also mena
  libya: {
    label: "Libya",
    type: "country",
    isoAlpha2: "LY",
    isoAlpha3: "LBY",
    parents: ["north_africa", "mena", "middle_east_africa"],
  },

  // Tunisia — also mena
  tunisia: {
    label: "Tunisia",
    type: "country",
    isoAlpha2: "TN",
    isoAlpha3: "TUN",
    parents: ["north_africa", "mena", "middle_east_africa"],
  },

  // Algeria — also mena
  algeria: {
    label: "Algeria",
    type: "country",
    isoAlpha2: "DZ",
    isoAlpha3: "DZA",
    parents: ["north_africa", "mena", "middle_east_africa"],
  },

  // Morocco — also mena
  morocco: {
    label: "Morocco",
    type: "country",
    isoAlpha2: "MA",
    isoAlpha3: "MAR",
    parents: ["north_africa", "mena", "middle_east_africa"],
  },

  sudan: {
    label: "Sudan",
    type: "country",
    isoAlpha2: "SD",
    isoAlpha3: "SDN",
    parents: ["north_africa", "middle_east_africa"],
  },

  south_sudan: {
    label: "South Sudan",
    type: "country",
    isoAlpha2: "SS",
    isoAlpha3: "SSD",
    parents: ["north_africa", "middle_east_africa"],
  },

  // Geopolitical status: Disputed territory. Claimed by Morocco;
  // recognized by the African Union as the Sahrawi Arab Democratic Republic.
  western_sahara: {
    label: "Western Sahara",
    type: "country",
    isoAlpha2: "EH",
    isoAlpha3: "ESH",
    parents: ["north_africa", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // SUB-SAHARAN AFRICA — WEST AFRICA
  // ---------------------------------------------------------------------------

  nigeria: {
    label: "Nigeria",
    type: "country",
    isoAlpha2: "NG",
    isoAlpha3: "NGA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  ghana: {
    label: "Ghana",
    type: "country",
    isoAlpha2: "GH",
    isoAlpha3: "GHA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  senegal: {
    label: "Senegal",
    type: "country",
    isoAlpha2: "SN",
    isoAlpha3: "SEN",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  ivory_coast: {
    label: "Ivory Coast",
    type: "country",
    isoAlpha2: "CI",
    isoAlpha3: "CIV",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  mali: {
    label: "Mali",
    type: "country",
    isoAlpha2: "ML",
    isoAlpha3: "MLI",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  burkina_faso: {
    label: "Burkina Faso",
    type: "country",
    isoAlpha2: "BF",
    isoAlpha3: "BFA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  niger: {
    label: "Niger",
    type: "country",
    isoAlpha2: "NE",
    isoAlpha3: "NER",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  guinea: {
    label: "Guinea",
    type: "country",
    isoAlpha2: "GN",
    isoAlpha3: "GIN",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  sierra_leone: {
    label: "Sierra Leone",
    type: "country",
    isoAlpha2: "SL",
    isoAlpha3: "SLE",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  liberia: {
    label: "Liberia",
    type: "country",
    isoAlpha2: "LR",
    isoAlpha3: "LBR",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  togo: {
    label: "Togo",
    type: "country",
    isoAlpha2: "TG",
    isoAlpha3: "TGO",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  benin: {
    label: "Benin",
    type: "country",
    isoAlpha2: "BJ",
    isoAlpha3: "BEN",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  mauritania: {
    label: "Mauritania",
    type: "country",
    isoAlpha2: "MR",
    isoAlpha3: "MRT",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  gambia: {
    label: "Gambia",
    type: "country",
    isoAlpha2: "GM",
    isoAlpha3: "GMB",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  guinea_bissau: {
    label: "Guinea-Bissau",
    type: "country",
    isoAlpha2: "GW",
    isoAlpha3: "GNB",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  cabo_verde: {
    label: "Cabo Verde",
    type: "country",
    isoAlpha2: "CV",
    isoAlpha3: "CPV",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // SUB-SAHARAN AFRICA — EAST AFRICA
  // ---------------------------------------------------------------------------

  ethiopia: {
    label: "Ethiopia",
    type: "country",
    isoAlpha2: "ET",
    isoAlpha3: "ETH",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  kenya: {
    label: "Kenya",
    type: "country",
    isoAlpha2: "KE",
    isoAlpha3: "KEN",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  tanzania: {
    label: "Tanzania",
    type: "country",
    isoAlpha2: "TZ",
    isoAlpha3: "TZA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  uganda: {
    label: "Uganda",
    type: "country",
    isoAlpha2: "UG",
    isoAlpha3: "UGA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  rwanda: {
    label: "Rwanda",
    type: "country",
    isoAlpha2: "RW",
    isoAlpha3: "RWA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  burundi: {
    label: "Burundi",
    type: "country",
    isoAlpha2: "BI",
    isoAlpha3: "BDI",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  somalia: {
    label: "Somalia",
    type: "country",
    isoAlpha2: "SO",
    isoAlpha3: "SOM",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  eritrea: {
    label: "Eritrea",
    type: "country",
    isoAlpha2: "ER",
    isoAlpha3: "ERI",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  djibouti: {
    label: "Djibouti",
    type: "country",
    isoAlpha2: "DJ",
    isoAlpha3: "DJI",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  comoros: {
    label: "Comoros",
    type: "country",
    isoAlpha2: "KM",
    isoAlpha3: "COM",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  mauritius: {
    label: "Mauritius",
    type: "country",
    isoAlpha2: "MU",
    isoAlpha3: "MUS",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  seychelles: {
    label: "Seychelles",
    type: "country",
    isoAlpha2: "SC",
    isoAlpha3: "SYC",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  madagascar: {
    label: "Madagascar",
    type: "country",
    isoAlpha2: "MG",
    isoAlpha3: "MDG",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // SUB-SAHARAN AFRICA — CENTRAL AFRICA
  // ---------------------------------------------------------------------------

  democratic_republic_of_the_congo: {
    label: "Democratic Republic of the Congo",
    type: "country",
    isoAlpha2: "CD",
    isoAlpha3: "COD",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  republic_of_the_congo: {
    label: "Republic of the Congo",
    type: "country",
    isoAlpha2: "CG",
    isoAlpha3: "COG",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  cameroon: {
    label: "Cameroon",
    type: "country",
    isoAlpha2: "CM",
    isoAlpha3: "CMR",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  central_african_republic: {
    label: "Central African Republic",
    type: "country",
    isoAlpha2: "CF",
    isoAlpha3: "CAF",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  chad: {
    label: "Chad",
    type: "country",
    isoAlpha2: "TD",
    isoAlpha3: "TCD",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  gabon: {
    label: "Gabon",
    type: "country",
    isoAlpha2: "GA",
    isoAlpha3: "GAB",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  equatorial_guinea: {
    label: "Equatorial Guinea",
    type: "country",
    isoAlpha2: "GQ",
    isoAlpha3: "GNQ",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  sao_tome_and_principe: {
    label: "Sao Tome and Principe",
    type: "country",
    isoAlpha2: "ST",
    isoAlpha3: "STP",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // SUB-SAHARAN AFRICA — SOUTHERN AFRICA
  // ---------------------------------------------------------------------------

  south_africa: {
    label: "South Africa",
    type: "country",
    isoAlpha2: "ZA",
    isoAlpha3: "ZAF",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  namibia: {
    label: "Namibia",
    type: "country",
    isoAlpha2: "NA",
    isoAlpha3: "NAM",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  botswana: {
    label: "Botswana",
    type: "country",
    isoAlpha2: "BW",
    isoAlpha3: "BWA",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  zimbabwe: {
    label: "Zimbabwe",
    type: "country",
    isoAlpha2: "ZW",
    isoAlpha3: "ZWE",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  mozambique: {
    label: "Mozambique",
    type: "country",
    isoAlpha2: "MZ",
    isoAlpha3: "MOZ",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  zambia: {
    label: "Zambia",
    type: "country",
    isoAlpha2: "ZM",
    isoAlpha3: "ZMB",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  malawi: {
    label: "Malawi",
    type: "country",
    isoAlpha2: "MW",
    isoAlpha3: "MWI",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  angola: {
    label: "Angola",
    type: "country",
    isoAlpha2: "AO",
    isoAlpha3: "AGO",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  eswatini: {
    label: "Eswatini",
    type: "country",
    isoAlpha2: "SZ",
    isoAlpha3: "SWZ",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  lesotho: {
    label: "Lesotho",
    type: "country",
    isoAlpha2: "LS",
    isoAlpha3: "LSO",
    parents: ["sub_saharan_africa", "middle_east_africa"],
  },

  // ---------------------------------------------------------------------------
  // CENTRAL ASIA / CIS
  // ---------------------------------------------------------------------------

  kazakhstan: {
    label: "Kazakhstan",
    type: "country",
    isoAlpha2: "KZ",
    isoAlpha3: "KAZ",
    parents: ["central_asia", "cis"],
  },

  uzbekistan: {
    label: "Uzbekistan",
    type: "country",
    isoAlpha2: "UZ",
    isoAlpha3: "UZB",
    parents: ["central_asia", "cis"],
  },

  turkmenistan: {
    label: "Turkmenistan",
    type: "country",
    isoAlpha2: "TM",
    isoAlpha3: "TKM",
    parents: ["central_asia", "cis"],
  },

  tajikistan: {
    label: "Tajikistan",
    type: "country",
    isoAlpha2: "TJ",
    isoAlpha3: "TJK",
    parents: ["central_asia", "cis"],
  },

  kyrgyzstan: {
    label: "Kyrgyzstan",
    type: "country",
    isoAlpha2: "KG",
    isoAlpha3: "KGZ",
    parents: ["central_asia", "cis"],
  },

  // Russia, Armenia, Azerbaijan, Georgia — CIS members not in central_asia
  russia: {
    label: "Russia",
    type: "country",
    isoAlpha2: "RU",
    isoAlpha3: "RUS",
    parents: ["cis"],
  },

  armenia: {
    label: "Armenia",
    type: "country",
    isoAlpha2: "AM",
    isoAlpha3: "ARM",
    parents: ["cis"],
  },

  azerbaijan: {
    label: "Azerbaijan",
    type: "country",
    isoAlpha2: "AZ",
    isoAlpha3: "AZE",
    parents: ["cis"],
  },

  georgia: {
    label: "Georgia",
    type: "country",
    isoAlpha2: "GE",
    isoAlpha3: "GEO",
    parents: ["cis"],
  },

  // ---------------------------------------------------------------------------
  // DISPUTED TERRITORIES & SPECIAL CASES
  // ---------------------------------------------------------------------------

  // Geopolitical status: Partially recognized state. Not a UN member.
  // Recognized by 104 UN member states.
  // ISO 3166-1 uses user-assigned codes XK/XKX.
  kosovo: {
    label: "Kosovo",
    type: "country",
    isoAlpha2: "XK",
    isoAlpha3: "XKX",
    parents: ["southern_europe", "europe"],
  },

  // Geopolitical status: Disputed territory.
  // Recognized by Russia, Nicaragua, Venezuela, Nauru, and Syria.
  // No ISO 3166-1 code; empty strings used for ISO codes.
  south_ossetia: {
    label: "South Ossetia",
    type: "country",
    isoAlpha2: "",
    isoAlpha3: "",
    parents: ["cis"],
  },

} as const
