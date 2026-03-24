# Region Normalization Module

Comprehensive region normalization for the Neobanks Radar card filtering system.

## Usage

```typescript
import {
  matchesRegion,
  resolveRegion,
  matchesFilter,
  getChildren,
  listUnknown,
  normalizeKey,
  SPREADSHEET_NAMES,
  SPREADSHEET_REGIONS,
} from "@/utils/regions"
```

### Filter a card by region (main use case)

```typescript
// Card has regions: "EEA, UK"
matchesRegion("EEA, UK", "Germany")  // true — Germany is in EEA
matchesRegion("EEA, UK", "France")   // true — France is in EEA
matchesRegion("EEA, UK", "US")       // false
matchesRegion("Global", "anything")  // true — Global matches everything
matchesRegion("EEA, UK", "Europe")   // true — EEA's parent is Europe
matchesRegion("EEA, UK", "")         // true — empty filter = show all
```

### Resolve a raw string to canonical form

```typescript
resolveRegion("USA")
// { key: "united_states", node: { label: "United States", type: "country", isoAlpha2: "US", ... } }

resolveRegion("uk")
// { key: "united_kingdom", node: { label: "United Kingdom", type: "country", ... } }

resolveRegion("EEA")
// { key: "eea", node: { label: "EEA", type: "sub_region", ... } }

resolveRegion("xyzzy")
// null
```

### Check hierarchy membership

```typescript
matchesFilter("Germany", "eea")      // true — Germany is in EEA
matchesFilter("Germany", "europe")   // true — Germany's ancestors include europe
matchesFilter("Germany", "apac")     // false
matchesFilter("Brazil", "latam")     // true
matchesFilter("Brazil", "americas")  // true
```

### Get children of a region

```typescript
getChildren("nordic")
// ["sweden", "denmark", "finland", "norway", "iceland"]

getChildren("gcc")
// ["saudi_arabia", "united_arab_emirates", "qatar", "kuwait", "bahrain", "oman"]
```

### QA: find unresolvable values

```typescript
listUnknown(["US", "EEA", "FooBar", "Global"])
// ["FooBar"]
```

## Hierarchy Diagram

```
Global
├── Americas
│   ├── North America
│   │   ├── United States
│   │   ├── Canada
│   │   └── Mexico *
│   ├── Central America (LATAM)
│   │   ├── Guatemala, Belize, Honduras, El Salvador
│   │   ├── Nicaragua, Costa Rica, Panama
│   │   └── ...
│   ├── Caribbean (LATAM)
│   │   ├── Cuba, Haiti, Dominican Republic, Jamaica
│   │   ├── Trinidad and Tobago, Bahamas, Barbados
│   │   └── ...
│   └── South America (LATAM)
│       ├── Brazil, Argentina, Colombia, Peru
│       ├── Venezuela, Chile, Ecuador, Bolivia
│       └── Paraguay, Uruguay, Guyana, Suriname
├── Europe
│   ├── Western Europe
│   │   ├── [DACH] Germany *, Austria *, Switzerland
│   │   ├── [Benelux] Netherlands *, Belgium *, Luxembourg *
│   │   ├── France *, Ireland *, Monaco, Liechtenstein *
│   │   └── (* = also in EEA, except Switzerland)
│   ├── Northern Europe
│   │   ├── United Kingdom
│   │   ├── [Nordic] Sweden *, Denmark *, Finland *, Norway *, Iceland *
│   │   └── [Baltic] Estonia *, Latvia *, Lithuania *
│   ├── Southern Europe
│   │   ├── Italy *, Spain *, Portugal *, Greece *
│   │   ├── Croatia *, Slovenia *, Malta *, Cyprus *
│   │   ├── Andorra, San Marino, Vatican City
│   │   └── North Macedonia, Albania, Montenegro, Bosnia, Serbia
│   └── Eastern Europe
│       ├── Poland *, Czech Republic *, Romania *, Hungary *
│       ├── Slovakia *, Bulgaria *
│       └── Ukraine, Moldova, Belarus
├── Asia Pacific (APAC)
│   ├── East Asia
│   │   ├── China, Japan, South Korea, North Korea
│   │   ├── Mongolia, Taiwan †
│   │   └── ...
│   ├── Southeast Asia
│   │   ├── [ASEAN] Indonesia, Thailand, Vietnam, Philippines
│   │   ├── Malaysia, Singapore, Myanmar, Cambodia
│   │   └── Laos, Brunei, Timor-Leste
│   ├── South Asia
│   │   ├── India, Pakistan, Bangladesh, Sri Lanka
│   │   └── Nepal, Bhutan, Maldives, Afghanistan
│   └── Oceania
│       ├── Australia, New Zealand, Papua New Guinea
│       ├── Fiji, Solomon Islands, Vanuatu, Samoa
│       └── Kiribati, Tonga, Micronesia, Palau, Marshall Islands, Tuvalu, Nauru
├── Middle East & Africa
│   ├── Middle East
│   │   ├── [GCC] Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman
│   │   ├── Iraq, Iran, Israel, Jordan, Lebanon
│   │   ├── Syria, Yemen, Palestine †, Turkey
│   │   └── ...
│   ├── North Africa (MENA)
│   │   ├── Egypt, Libya, Tunisia, Algeria, Morocco
│   │   └── Sudan, South Sudan, Western Sahara †
│   └── Sub-Saharan Africa
│       ├── West: Nigeria, Ghana, Senegal, Ivory Coast, ...
│       ├── East: Ethiopia, Kenya, Tanzania, Uganda, Rwanda, ...
│       ├── Central: DR Congo, Cameroon, Chad, Gabon, ...
│       └── Southern: South Africa, Namibia, Botswana, ...
└── CIS
    ├── Central Asia
    │   └── Kazakhstan, Uzbekistan, Turkmenistan, Tajikistan, Kyrgyzstan
    └── Russia, Armenia, Azerbaijan, Georgia

Legend: * = EEA member, † = disputed territory
```

## Spreadsheet Naming Reference

When entering data in the Google Sheets source, use these exact names:

### Regions / Groups

| Key | Spreadsheet Value |
|-----|------------------|
| Global | Global |
| EEA | EEA |
| LATAM | LATAM |
| APAC | Asia Pacific |
| Americas | Americas |
| Europe | Europe |
| Middle East | Middle East |
| GCC | GCC |
| MENA | MENA |
| Nordic | Nordic Countries |
| DACH | DACH |
| ASEAN | ASEAN |

### Countries (by region)

**North America**: United States, Canada, Mexico
**Central America**: Guatemala, Belize, Honduras, El Salvador, Nicaragua, Costa Rica, Panama
**Caribbean**: Cuba, Haiti, Dominican Republic, Jamaica, Trinidad and Tobago, Bahamas, Barbados, Saint Lucia, Grenada, Saint Vincent and the Grenadines, Antigua and Barbuda, Dominica, Saint Kitts and Nevis
**South America**: Brazil, Argentina, Colombia, Peru, Venezuela, Chile, Ecuador, Bolivia, Paraguay, Uruguay, Guyana, Suriname
**Western Europe**: Germany, France, Netherlands, Belgium, Luxembourg, Austria, Switzerland, Ireland, Monaco, Liechtenstein
**Northern Europe**: United Kingdom, Sweden, Denmark, Finland, Norway, Iceland, Estonia, Latvia, Lithuania
**Southern Europe**: Italy, Spain, Portugal, Greece, Croatia, Slovenia, Malta, Cyprus, Andorra, San Marino, Vatican City, North Macedonia, Albania, Montenegro, Bosnia and Herzegovina, Serbia
**Eastern Europe**: Poland, Czech Republic, Romania, Hungary, Slovakia, Bulgaria, Ukraine, Moldova, Belarus
**East Asia**: China, Japan, South Korea, North Korea, Mongolia, Taiwan
**Southeast Asia**: Indonesia, Thailand, Vietnam, Philippines, Malaysia, Singapore, Myanmar, Cambodia, Laos, Brunei, Timor-Leste
**South Asia**: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan
**Oceania**: Australia, New Zealand, Papua New Guinea, Fiji, Solomon Islands, Vanuatu, Samoa, Kiribati, Tonga, Micronesia, Palau, Marshall Islands, Tuvalu, Nauru
**Middle East**: Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Bahrain, Oman, Iraq, Iran, Israel, Jordan, Lebanon, Syria, Yemen, Palestine, Turkey
**North Africa**: Egypt, Libya, Tunisia, Algeria, Morocco, Sudan, South Sudan, Western Sahara
**Sub-Saharan Africa**: Nigeria, Ghana, Senegal, Ivory Coast, Mali, Burkina Faso, Niger, Guinea, Sierra Leone, Liberia, Togo, Benin, Mauritania, Gambia, Guinea-Bissau, Cabo Verde, Ethiopia, Kenya, Tanzania, Uganda, Rwanda, Burundi, Somalia, Eritrea, Djibouti, Comoros, Mauritius, Seychelles, Madagascar, Democratic Republic of the Congo, Republic of the Congo, Cameroon, Central African Republic, Chad, Gabon, Equatorial Guinea, Sao Tome and Principe, South Africa, Namibia, Botswana, Zimbabwe, Mozambique, Zambia, Malawi, Angola, Eswatini, Lesotho
**CIS / Central Asia**: Kazakhstan, Uzbekistan, Turkmenistan, Tajikistan, Kyrgyzstan, Russia, Armenia, Azerbaijan, Georgia

### Disputed Territories
Kosovo, South Ossetia
