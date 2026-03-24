export const REGION_ALIASES: Readonly<Record<string, string>> = {
  // Super regions
  "americas": "americas",
  "europe": "europe",
  "asia pacific": "apac",
  "apac": "apac",
  "asia": "apac",
  "middle east & africa": "middle_east_africa",
  "middle east and africa": "middle_east_africa",
  "middle east africa": "middle_east_africa",
  "mea": "middle_east_africa",
  "africa": "middle_east_africa",
  "cis": "cis",

  // Regions
  "north america": "north_america",
  "central america": "central_america",
  "caribbean": "caribbean",
  "south america": "south_america",
  "western europe": "western_europe",
  "eastern europe": "eastern_europe",
  "northern europe": "northern_europe",
  "southern europe": "southern_europe",
  "east asia": "east_asia",
  "southeast asia": "southeast_asia",
  "south asia": "south_asia",
  "oceania": "oceania",
  "sub-saharan africa": "sub_saharan_africa",
  "sub saharan africa": "sub_saharan_africa",
  "north africa": "north_africa",
  "middle east": "middle_east",
  "central asia": "central_asia",

  // Sub-regions
  "nordic": "nordic",
  "nordic countries": "nordic",
  "scandinavia": "nordic",
  "dach": "dach",
  "benelux": "benelux",
  "baltic": "baltic",
  "baltic states": "baltic",
  "baltics": "baltic",
  "mena": "mena",
  "eea": "eea",
  "european economic area": "eea",
  "eu": "eea",
  "european union": "eea",
  "latam": "latam",
  "latin america": "latam",
  "asean": "asean",
  "gcc": "gcc",
  "gulf states": "gcc",

  // United States
  "united_states": "united_states",
  "united states": "united_states",
  "united states of america": "united_states",
  "us": "united_states",
  "usa": "united_states",

  // Canada
  "canada": "canada",
  "ca": "canada",
  "can": "canada",

  // Mexico
  "mexico": "mexico",
  "mx": "mexico",
  "mex": "mexico",
  "mejico": "mexico",

  // Guatemala
  "guatemala": "guatemala",
  "gt": "guatemala",
  "gtm": "guatemala",

  // Belize
  "belize": "belize",
  "bz": "belize",
  "blz": "belize",

  // Honduras
  "honduras": "honduras",
  "hn": "honduras",
  "hnd": "honduras",

  // El Salvador
  "el_salvador": "el_salvador",
  "el salvador": "el_salvador",
  "sv": "el_salvador",
  "slv": "el_salvador",

  // Nicaragua
  "nicaragua": "nicaragua",
  "ni": "nicaragua",
  "nic": "nicaragua",

  // Costa Rica
  "costa_rica": "costa_rica",
  "costa rica": "costa_rica",
  "cr": "costa_rica",
  "cri": "costa_rica",

  // Panama
  "panama": "panama",
  "pa": "panama",
  "pan": "panama",

  // Cuba
  "cuba": "cuba",
  "cu": "cuba",
  "cub": "cuba",

  // Haiti
  "haiti": "haiti",
  "ht": "haiti",
  "hti": "haiti",

  // Dominican Republic
  "dominican_republic": "dominican_republic",
  "dominican republic": "dominican_republic",
  "do": "dominican_republic",
  "dom": "dominican_republic",

  // Jamaica
  "jamaica": "jamaica",
  "jm": "jamaica",
  "jam": "jamaica",

  // Trinidad and Tobago
  "trinidad_and_tobago": "trinidad_and_tobago",
  "trinidad and tobago": "trinidad_and_tobago",
  "trinidad": "trinidad_and_tobago",
  "tt": "trinidad_and_tobago",
  "tto": "trinidad_and_tobago",

  // Bahamas
  "bahamas": "bahamas",
  "the bahamas": "bahamas",
  "bs": "bahamas",
  "bhs": "bahamas",

  // Barbados
  "barbados": "barbados",
  "bb": "barbados",
  "brb": "barbados",

  // Saint Lucia
  "saint_lucia": "saint_lucia",
  "saint lucia": "saint_lucia",
  "st lucia": "saint_lucia",
  "st. lucia": "saint_lucia",
  "lc": "saint_lucia",
  "lca": "saint_lucia",

  // Grenada
  "grenada": "grenada",
  "gd": "grenada",
  "grd": "grenada",

  // Saint Vincent and the Grenadines
  "saint_vincent_and_the_grenadines": "saint_vincent_and_the_grenadines",
  "saint vincent and the grenadines": "saint_vincent_and_the_grenadines",
  "saint vincent": "saint_vincent_and_the_grenadines",
  "st vincent": "saint_vincent_and_the_grenadines",
  "vc": "saint_vincent_and_the_grenadines",
  "vct": "saint_vincent_and_the_grenadines",

  // Antigua and Barbuda
  "antigua_and_barbuda": "antigua_and_barbuda",
  "antigua and barbuda": "antigua_and_barbuda",
  "antigua": "antigua_and_barbuda",
  "ag": "antigua_and_barbuda",
  "atg": "antigua_and_barbuda",

  // Dominica
  "dominica": "dominica",
  "dm": "dominica",
  "dma": "dominica",

  // Saint Kitts and Nevis
  "saint_kitts_and_nevis": "saint_kitts_and_nevis",
  "saint kitts and nevis": "saint_kitts_and_nevis",
  "st kitts": "saint_kitts_and_nevis",
  "st. kitts and nevis": "saint_kitts_and_nevis",
  "kn": "saint_kitts_and_nevis",
  "kna": "saint_kitts_and_nevis",

  // Brazil
  "brazil": "brazil",
  "brasil": "brazil",
  "br": "brazil",
  "bra": "brazil",

  // Argentina
  "argentina": "argentina",
  "ar": "argentina",
  "arg": "argentina",

  // Colombia
  "colombia": "colombia",
  "co": "colombia",
  "col": "colombia",

  // Peru
  "peru": "peru",
  "pe": "peru",
  "per": "peru",

  // Venezuela
  "venezuela": "venezuela",
  "ve": "venezuela",
  "ven": "venezuela",

  // Chile
  "chile": "chile",
  "cl": "chile",
  "chl": "chile",

  // Ecuador
  "ecuador": "ecuador",
  "ec": "ecuador",
  "ecu": "ecuador",

  // Bolivia
  "bolivia": "bolivia",
  "bo": "bolivia",
  "bol": "bolivia",

  // Paraguay
  "paraguay": "paraguay",
  "py": "paraguay",
  "pry": "paraguay",

  // Uruguay
  "uruguay": "uruguay",
  "uy": "uruguay",
  "ury": "uruguay",

  // Guyana
  "guyana": "guyana",
  "gy": "guyana",
  "guy": "guyana",

  // Suriname
  "suriname": "suriname",
  "sr": "suriname",
  "sur": "suriname",

  // Germany
  "germany": "germany",
  "deutschland": "germany",
  "de": "germany",
  "deu": "germany",

  // France
  "france": "france",
  "fr": "france",
  "fra": "france",

  // Netherlands
  "netherlands": "netherlands",
  "the netherlands": "netherlands",
  "holland": "netherlands",
  "nl": "netherlands",
  "nld": "netherlands",

  // Belgium
  "belgium": "belgium",
  "be": "belgium",
  "bel": "belgium",

  // Luxembourg
  "luxembourg": "luxembourg",
  "lu": "luxembourg",
  "lux": "luxembourg",

  // Austria
  "austria": "austria",
  "at": "austria",
  "aut": "austria",

  // Switzerland
  "switzerland": "switzerland",
  "ch": "switzerland",
  "che": "switzerland",

  // Ireland
  "ireland": "ireland",
  "ie": "ireland",
  "irl": "ireland",

  // Monaco
  "monaco": "monaco",
  "mc": "monaco",
  "mco": "monaco",

  // Liechtenstein
  "liechtenstein": "liechtenstein",
  "li": "liechtenstein",
  "lie": "liechtenstein",

  // United Kingdom
  "united_kingdom": "united_kingdom",
  "united kingdom": "united_kingdom",
  "uk": "united_kingdom",
  "gb": "united_kingdom",
  "gbr": "united_kingdom",
  "great britain": "united_kingdom",
  "britain": "united_kingdom",
  "england": "united_kingdom",

  // Sweden
  "sweden": "sweden",
  "se": "sweden",
  "swe": "sweden",

  // Denmark
  "denmark": "denmark",
  "dk": "denmark",
  "dnk": "denmark",

  // Finland
  "finland": "finland",
  "fi": "finland",
  "fin": "finland",

  // Norway
  "norway": "norway",
  "no": "norway",
  "nor": "norway",

  // Iceland
  "iceland": "iceland",
  "is": "iceland",
  "isl": "iceland",

  // Estonia
  "estonia": "estonia",
  "ee": "estonia",
  "est": "estonia",

  // Latvia
  "latvia": "latvia",
  "lv": "latvia",
  "lva": "latvia",

  // Lithuania
  "lithuania": "lithuania",
  "lt": "lithuania",
  "ltu": "lithuania",

  // Italy
  "italy": "italy",
  "it": "italy",
  "ita": "italy",

  // Spain
  "spain": "spain",
  "es": "spain",
  "esp": "spain",

  // Portugal
  "portugal": "portugal",
  "pt": "portugal",
  "prt": "portugal",

  // Greece
  "greece": "greece",
  "gr": "greece",
  "grc": "greece",

  // Croatia
  "croatia": "croatia",
  "hr": "croatia",
  "hrv": "croatia",

  // Slovenia
  "slovenia": "slovenia",
  "si": "slovenia",
  "svn": "slovenia",

  // Malta
  "malta": "malta",
  "mt": "malta",
  "mlt": "malta",

  // Cyprus
  "cyprus": "cyprus",
  "cy": "cyprus",
  "cyp": "cyprus",

  // Andorra
  "andorra": "andorra",
  "ad": "andorra",
  "and": "andorra",

  // San Marino
  "san_marino": "san_marino",
  "san marino": "san_marino",
  "sm": "san_marino",
  "smr": "san_marino",

  // Vatican City
  "vatican_city": "vatican_city",
  "vatican city": "vatican_city",
  "vatican": "vatican_city",
  "holy see": "vatican_city",
  "va": "vatican_city",
  "vat": "vatican_city",

  // North Macedonia
  "north_macedonia": "north_macedonia",
  "north macedonia": "north_macedonia",
  "macedonia": "north_macedonia",
  "mk": "north_macedonia",
  "mkd": "north_macedonia",

  // Albania
  "albania": "albania",
  "al": "albania",
  "alb": "albania",

  // Montenegro
  "montenegro": "montenegro",
  "me": "montenegro",
  "mne": "montenegro",

  // Bosnia and Herzegovina
  "bosnia_and_herzegovina": "bosnia_and_herzegovina",
  "bosnia and herzegovina": "bosnia_and_herzegovina",
  "bosnia": "bosnia_and_herzegovina",
  "ba": "bosnia_and_herzegovina",
  "bih": "bosnia_and_herzegovina",

  // Serbia
  "serbia": "serbia",
  "rs": "serbia",
  "srb": "serbia",

  // Poland
  "poland": "poland",
  "pl": "poland",
  "pol": "poland",

  // Czech Republic
  "czech_republic": "czech_republic",
  "czech republic": "czech_republic",
  "czechia": "czech_republic",
  "cz": "czech_republic",
  "cze": "czech_republic",

  // Romania
  "romania": "romania",
  "ro": "romania",
  "rou": "romania",

  // Hungary
  "hungary": "hungary",
  "hu": "hungary",
  "hun": "hungary",

  // Slovakia
  "slovakia": "slovakia",
  "sk": "slovakia",
  "svk": "slovakia",

  // Bulgaria
  "bulgaria": "bulgaria",
  "bg": "bulgaria",
  "bgr": "bulgaria",

  // Ukraine
  "ukraine": "ukraine",
  "ua": "ukraine",
  "ukr": "ukraine",

  // Moldova
  "moldova": "moldova",
  "md": "moldova",
  "mda": "moldova",

  // Belarus
  "belarus": "belarus",
  "by": "belarus",
  "blr": "belarus",

  // China
  "china": "china",
  "cn": "china",
  "chn": "china",
  "peoples republic of china": "china",

  // Japan
  "japan": "japan",
  "jp": "japan",
  "jpn": "japan",

  // South Korea
  "south_korea": "south_korea",
  "south korea": "south_korea",
  "korea": "south_korea",
  "republic of korea": "south_korea",
  "kr": "south_korea",
  "kor": "south_korea",

  // North Korea
  "north_korea": "north_korea",
  "north korea": "north_korea",
  "dprk": "north_korea",
  "kp": "north_korea",
  "prk": "north_korea",

  // Mongolia
  "mongolia": "mongolia",
  "mn": "mongolia",
  "mng": "mongolia",

  // Taiwan
  "taiwan": "taiwan",
  "tw": "taiwan",
  "twn": "taiwan",
  "chinese taipei": "taiwan",
  "republic of china": "taiwan",

  // Indonesia
  "indonesia": "indonesia",
  "id": "indonesia",
  "idn": "indonesia",

  // Thailand
  "thailand": "thailand",
  "th": "thailand",
  "tha": "thailand",

  // Vietnam
  "vietnam": "vietnam",
  "viet nam": "vietnam",
  "vn": "vietnam",
  "vnm": "vietnam",

  // Philippines
  "philippines": "philippines",
  "the philippines": "philippines",
  "ph": "philippines",
  "phl": "philippines",

  // Malaysia
  "malaysia": "malaysia",
  "my": "malaysia",
  "mys": "malaysia",

  // Singapore
  "singapore": "singapore",
  "sg": "singapore",
  "sgp": "singapore",

  // Myanmar
  "myanmar": "myanmar",
  "burma": "myanmar",
  "mm": "myanmar",
  "mmr": "myanmar",

  // Cambodia
  "cambodia": "cambodia",
  "kh": "cambodia",
  "khm": "cambodia",

  // Laos
  "laos": "laos",
  "lao": "laos",
  "la": "laos",

  // Brunei
  "brunei": "brunei",
  "bn": "brunei",
  "brn": "brunei",
  "brunei darussalam": "brunei",

  // Timor-Leste
  "timor_leste": "timor_leste",
  "timor-leste": "timor_leste",
  "timor leste": "timor_leste",
  "east timor": "timor_leste",
  "tl": "timor_leste",
  "tls": "timor_leste",

  // India
  "india": "india",
  "in": "india",
  "ind": "india",

  // Pakistan
  "pakistan": "pakistan",
  "pk": "pakistan",
  "pak": "pakistan",

  // Bangladesh
  "bangladesh": "bangladesh",
  "bd": "bangladesh",
  "bgd": "bangladesh",

  // Sri Lanka
  "sri_lanka": "sri_lanka",
  "sri lanka": "sri_lanka",
  "lk": "sri_lanka",
  "lka": "sri_lanka",
  "ceylon": "sri_lanka",

  // Nepal
  "nepal": "nepal",
  "np": "nepal",
  "npl": "nepal",

  // Bhutan
  "bhutan": "bhutan",
  "bt": "bhutan",
  "btn": "bhutan",

  // Maldives
  "maldives": "maldives",
  "mv": "maldives",
  "mdv": "maldives",

  // Afghanistan
  "afghanistan": "afghanistan",
  "af": "afghanistan",
  "afg": "afghanistan",

  // Australia
  "australia": "australia",
  "au": "australia",
  "aus": "australia",

  // New Zealand
  "new_zealand": "new_zealand",
  "new zealand": "new_zealand",
  "nz": "new_zealand",
  "nzl": "new_zealand",

  // Papua New Guinea
  "papua_new_guinea": "papua_new_guinea",
  "papua new guinea": "papua_new_guinea",
  "png": "papua_new_guinea",
  "pg": "papua_new_guinea",

  // Fiji
  "fiji": "fiji",
  "fj": "fiji",
  "fji": "fiji",

  // Solomon Islands
  "solomon_islands": "solomon_islands",
  "solomon islands": "solomon_islands",
  "sb": "solomon_islands",
  "slb": "solomon_islands",

  // Vanuatu
  "vanuatu": "vanuatu",
  "vu": "vanuatu",
  "vut": "vanuatu",

  // Samoa
  "samoa": "samoa",
  "ws": "samoa",
  "wsm": "samoa",

  // Kiribati
  "kiribati": "kiribati",
  "ki": "kiribati",
  "kir": "kiribati",

  // Tonga
  "tonga": "tonga",
  "to": "tonga",
  "ton": "tonga",

  // Micronesia
  "micronesia": "micronesia",
  "federated states of micronesia": "micronesia",
  "fm": "micronesia",
  "fsm": "micronesia",

  // Palau
  "palau": "palau",
  "pw": "palau",
  "plw": "palau",

  // Marshall Islands
  "marshall_islands": "marshall_islands",
  "marshall islands": "marshall_islands",
  "mh": "marshall_islands",
  "mhl": "marshall_islands",

  // Tuvalu
  "tuvalu": "tuvalu",
  "tv": "tuvalu",
  "tuv": "tuvalu",

  // Nauru
  "nauru": "nauru",
  "nr": "nauru",
  "nru": "nauru",

  // Saudi Arabia
  "saudi_arabia": "saudi_arabia",
  "saudi arabia": "saudi_arabia",
  "saudi": "saudi_arabia",
  "sa": "saudi_arabia",
  "sau": "saudi_arabia",
  "ksa": "saudi_arabia",

  // United Arab Emirates
  "united_arab_emirates": "united_arab_emirates",
  "united arab emirates": "united_arab_emirates",
  "uae": "united_arab_emirates",
  "ae": "united_arab_emirates",
  "are": "united_arab_emirates",
  "emirates": "united_arab_emirates",

  // Qatar
  "qatar": "qatar",
  "qa": "qatar",
  "qat": "qatar",

  // Kuwait
  "kuwait": "kuwait",
  "kw": "kuwait",
  "kwt": "kuwait",

  // Bahrain
  "bahrain": "bahrain",
  "bh": "bahrain",
  "bhr": "bahrain",

  // Oman
  "oman": "oman",
  "om": "oman",
  "omn": "oman",

  // Iraq
  "iraq": "iraq",
  "iq": "iraq",
  "irq": "iraq",

  // Iran
  "iran": "iran",
  "ir": "iran",
  "irn": "iran",
  "islamic republic of iran": "iran",
  "persia": "iran",

  // Israel
  "israel": "israel",
  "il": "israel",
  "isr": "israel",

  // Jordan
  "jordan": "jordan",
  "jo": "jordan",
  "jor": "jordan",

  // Lebanon
  "lebanon": "lebanon",
  "lb": "lebanon",
  "lbn": "lebanon",

  // Syria
  "syria": "syria",
  "sy": "syria",
  "syr": "syria",
  "syrian arab republic": "syria",

  // Yemen
  "yemen": "yemen",
  "ye": "yemen",
  "yem": "yemen",

  // Palestine
  "palestine": "palestine",
  "ps": "palestine",
  "pse": "palestine",
  "state of palestine": "palestine",
  "palestinian territories": "palestine",

  // Turkey
  "turkey": "turkey",
  "turkiye": "turkey",
  "tr": "turkey",
  "tur": "turkey",

  // Egypt
  "egypt": "egypt",
  "eg": "egypt",
  "egy": "egypt",

  // Libya
  "libya": "libya",
  "ly": "libya",
  "lby": "libya",

  // Tunisia
  "tunisia": "tunisia",
  "tn": "tunisia",
  "tun": "tunisia",

  // Algeria
  "algeria": "algeria",
  "dz": "algeria",
  "dza": "algeria",

  // Morocco
  "morocco": "morocco",
  "ma": "morocco",
  "mar": "morocco",

  // Sudan
  "sudan": "sudan",
  "sd": "sudan",
  "sdn": "sudan",

  // South Sudan
  "south_sudan": "south_sudan",
  "south sudan": "south_sudan",
  "ss": "south_sudan",
  "ssd": "south_sudan",

  // Western Sahara
  "western_sahara": "western_sahara",
  "western sahara": "western_sahara",
  "eh": "western_sahara",
  "esh": "western_sahara",

  // Nigeria
  "nigeria": "nigeria",
  "ng": "nigeria",
  "nga": "nigeria",

  // Ghana
  "ghana": "ghana",
  "gh": "ghana",
  "gha": "ghana",

  // Senegal
  "senegal": "senegal",
  "sn": "senegal",
  "sen": "senegal",

  // Ivory Coast
  "ivory_coast": "ivory_coast",
  "ivory coast": "ivory_coast",
  "cote divoire": "ivory_coast",
  "cote d'ivoire": "ivory_coast",
  "ci": "ivory_coast",
  "civ": "ivory_coast",

  // Mali
  "mali": "mali",
  "ml": "mali",
  "mli": "mali",

  // Burkina Faso
  "burkina_faso": "burkina_faso",
  "burkina faso": "burkina_faso",
  "burkina": "burkina_faso",
  "bf": "burkina_faso",
  "bfa": "burkina_faso",

  // Niger
  "niger": "niger",
  "ne": "niger",
  "ner": "niger",

  // Guinea
  "guinea": "guinea",
  "gn": "guinea",
  "gin": "guinea",

  // Sierra Leone
  "sierra_leone": "sierra_leone",
  "sierra leone": "sierra_leone",
  "sl": "sierra_leone",
  "sle": "sierra_leone",

  // Liberia
  "liberia": "liberia",
  "lr": "liberia",
  "lbr": "liberia",

  // Togo
  "togo": "togo",
  "tg": "togo",
  "tgo": "togo",

  // Benin
  "benin": "benin",
  "bj": "benin",
  "ben": "benin",

  // Mauritania
  "mauritania": "mauritania",
  "mr": "mauritania",
  "mrt": "mauritania",

  // Gambia
  "gambia": "gambia",
  "the gambia": "gambia",
  "gm": "gambia",
  "gmb": "gambia",

  // Guinea-Bissau
  "guinea_bissau": "guinea_bissau",
  "guinea-bissau": "guinea_bissau",
  "guinea bissau": "guinea_bissau",
  "gw": "guinea_bissau",
  "gnb": "guinea_bissau",

  // Cabo Verde
  "cabo_verde": "cabo_verde",
  "cabo verde": "cabo_verde",
  "cape verde": "cabo_verde",
  "cv": "cabo_verde",
  "cpv": "cabo_verde",

  // Ethiopia
  "ethiopia": "ethiopia",
  "et": "ethiopia",
  "eth": "ethiopia",

  // Kenya
  "kenya": "kenya",
  "ke": "kenya",
  "ken": "kenya",

  // Tanzania
  "tanzania": "tanzania",
  "tz": "tanzania",
  "tza": "tanzania",

  // Uganda
  "uganda": "uganda",
  "ug": "uganda",
  "uga": "uganda",

  // Rwanda
  "rwanda": "rwanda",
  "rw": "rwanda",
  "rwa": "rwanda",

  // Burundi
  "burundi": "burundi",
  "bi": "burundi",
  "bdi": "burundi",

  // Somalia
  "somalia": "somalia",
  "so": "somalia",
  "som": "somalia",

  // Eritrea
  "eritrea": "eritrea",
  "er": "eritrea",
  "eri": "eritrea",

  // Djibouti
  "djibouti": "djibouti",
  "dj": "djibouti",
  "dji": "djibouti",

  // Comoros
  "comoros": "comoros",
  "km": "comoros",
  "com": "comoros",

  // Mauritius
  "mauritius": "mauritius",
  "mu": "mauritius",
  "mus": "mauritius",

  // Seychelles
  "seychelles": "seychelles",
  "sc": "seychelles",
  "syc": "seychelles",

  // Madagascar
  "madagascar": "madagascar",
  "mg": "madagascar",
  "mdg": "madagascar",

  // Democratic Republic of the Congo
  "democratic_republic_of_the_congo": "democratic_republic_of_the_congo",
  "democratic republic of the congo": "democratic_republic_of_the_congo",
  "dr congo": "democratic_republic_of_the_congo",
  "drc": "democratic_republic_of_the_congo",
  "congo kinshasa": "democratic_republic_of_the_congo",
  "cd": "democratic_republic_of_the_congo",
  "cod": "democratic_republic_of_the_congo",

  // Republic of the Congo
  "republic_of_the_congo": "republic_of_the_congo",
  "republic of the congo": "republic_of_the_congo",
  "congo": "republic_of_the_congo",
  "congo brazzaville": "republic_of_the_congo",
  "cg": "republic_of_the_congo",
  "cog": "republic_of_the_congo",

  // Cameroon
  "cameroon": "cameroon",
  "cm": "cameroon",
  "cmr": "cameroon",

  // Central African Republic
  "central_african_republic": "central_african_republic",
  "central african republic": "central_african_republic",
  "car": "central_african_republic",
  "cf": "central_african_republic",
  "caf": "central_african_republic",

  // Chad
  "chad": "chad",
  "td": "chad",
  "tcd": "chad",

  // Gabon
  "gabon": "gabon",
  "ga": "gabon",
  "gab": "gabon",

  // Equatorial Guinea
  "equatorial_guinea": "equatorial_guinea",
  "equatorial guinea": "equatorial_guinea",
  "gq": "equatorial_guinea",
  "gnq": "equatorial_guinea",

  // Sao Tome and Principe
  "sao_tome_and_principe": "sao_tome_and_principe",
  "sao tome and principe": "sao_tome_and_principe",
  "sao tome": "sao_tome_and_principe",
  "st": "sao_tome_and_principe",
  "stp": "sao_tome_and_principe",

  // South Africa
  "south_africa": "south_africa",
  "south africa": "south_africa",
  "za": "south_africa",
  "zaf": "south_africa",

  // Namibia
  "namibia": "namibia",
  "na": "namibia",
  "nam": "namibia",

  // Botswana
  "botswana": "botswana",
  "bw": "botswana",
  "bwa": "botswana",

  // Zimbabwe
  "zimbabwe": "zimbabwe",
  "zw": "zimbabwe",
  "zwe": "zimbabwe",

  // Mozambique
  "mozambique": "mozambique",
  "mz": "mozambique",
  "moz": "mozambique",

  // Zambia
  "zambia": "zambia",
  "zm": "zambia",
  "zmb": "zambia",

  // Malawi
  "malawi": "malawi",
  "mw": "malawi",
  "mwi": "malawi",

  // Angola
  "angola": "angola",
  "ao": "angola",
  "ago": "angola",

  // Eswatini
  "eswatini": "eswatini",
  "swaziland": "eswatini",
  "sz": "eswatini",
  "swz": "eswatini",

  // Lesotho
  "lesotho": "lesotho",
  "ls": "lesotho",
  "lso": "lesotho",

  // Kazakhstan
  "kazakhstan": "kazakhstan",
  "kz": "kazakhstan",
  "kaz": "kazakhstan",

  // Uzbekistan
  "uzbekistan": "uzbekistan",
  "uz": "uzbekistan",
  "uzb": "uzbekistan",

  // Turkmenistan
  "turkmenistan": "turkmenistan",
  "tm": "turkmenistan",
  "tkm": "turkmenistan",

  // Tajikistan
  "tajikistan": "tajikistan",
  "tj": "tajikistan",
  "tjk": "tajikistan",

  // Kyrgyzstan
  "kyrgyzstan": "kyrgyzstan",
  "kg": "kyrgyzstan",
  "kgz": "kyrgyzstan",

  // Russia
  "russia": "russia",
  "russian federation": "russia",
  "ru": "russia",
  "rus": "russia",

  // Armenia
  "armenia": "armenia",
  "am": "armenia",
  "arm": "armenia",

  // Azerbaijan
  "azerbaijan": "azerbaijan",
  "az": "azerbaijan",
  "aze": "azerbaijan",

  // Georgia (country)
  "georgia": "georgia",
  "ge": "georgia",
  "geo": "georgia",

  // Kosovo
  "kosovo": "kosovo",
  "xk": "kosovo",
  "xkx": "kosovo",

  // South Ossetia
  "south_ossetia": "south_ossetia",
  "south ossetia": "south_ossetia",

  // Special entries
  "global": "global",
  "worldwide": "global",
  "world": "global",
  "all": "global",
  "everywhere": "global",
} as const
