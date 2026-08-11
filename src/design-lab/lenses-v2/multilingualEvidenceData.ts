export type EvidenceLanguage = "ne" | "hi" | "en";
export type EvidenceSourceType = "news" | "social" | "official";
export type SentimentPolarity = "positive" | "negative" | "mixed" | "neutral" | "unresolved";
export type EmotionCategory = "concern" | "frustration" | "relief" | "anger" | "hope" | "uncertainty" | "unresolved";
export type EmotionAttribution = "direct" | "quoted" | "reported" | "attributed" | "not-expressed";

export interface MultilingualEvidenceItem {
  id: string;
  semanticLabel: string;
  language: EvidenceLanguage;
  languageLabel: "नेपाली" | "हिन्दी" | "English";
  sourceType: EvidenceSourceType;
  originalText: string;
  translation?: string;
  carrierLabel: string;
  topic: string;
  narrative: {
    claim: string;
    frame: "Infrastructure Preparedness" | "Immediate Public Safety" | "Information & Coordination" | "Temporary Disruption" | "Multi-frame" | "Unassigned";
    family: "Preparedness & continuity" | "Safety response" | "Coordination" | "Qualification" | "Unresolved";
    relation: "supports" | "qualifies" | "contests" | "multi-frame" | "insufficient";
  };
  sentiment?: {
    holder: string;
    target: string;
    aspect: string;
    polarity: SentimentPolarity;
    polarityValue: number;
    intensity: number;
    recurrence: number;
  };
  emotion: {
    category: EmotionCategory;
    valence: number;
    arousal: number;
    recurrence: number;
    attribution: EmotionAttribution;
    experiencer: string;
    trigger: string;
    object: string;
  };
  placeLabels?: string[];
  canonicalPlace?: string;
  sourceFamily?: string;
  entityAliases?: string[];
  verificationRelation?: "unreviewed" | "context-only";
}

export const multilingualEvidence: MultilingualEvidenceItem[] = [
  {
    id: "ne-news-transport",
    semanticLabel: "Nepali News",
    language: "ne",
    languageLabel: "नेपाली",
    sourceType: "news",
    originalText: "लगातार वर्षाका कारण केही सडकखण्डमा यातायात प्रभावित भएको छ। स्थानीय प्रशासनले यात्रुहरूलाई वैकल्पिक मार्ग प्रयोग गर्न आग्रह गरेको छ।",
    translation: "Continuous rainfall has affected traffic on several road sections. Local authorities have advised travellers to use alternative routes.",
    carrierLabel: "Local news report",
    topic: "Transport disruption",
    narrative: { claim: "Rainfall has interrupted travel and alternative routes are advised.", frame: "Immediate Public Safety", family: "Safety response", relation: "supports" },
    sentiment: { holder: "News report", target: "Travel conditions", aspect: "Current disruption", polarity: "neutral", polarityValue: -0.06, intensity: 0.34, recurrence: 2 },
    emotion: { category: "unresolved", valence: -0.08, arousal: 0.22, recurrence: 1, attribution: "not-expressed", experiencer: "Not expressed", trigger: "Road disruption", object: "Travel conditions" },
    placeLabels: ["काठमाडौं", "Kathmandu"], canonicalPlace: "Kathmandu", sourceFamily: "Local reporting", verificationRelation: "unreviewed",
  },
  {
    id: "ne-social-infrastructure",
    semanticLabel: "Nepali Social",
    language: "ne",
    languageLabel: "नेपाली",
    sourceType: "social",
    originalText: "हरेक वर्ष वर्षामा यही समस्या दोहोरिन्छ। सडक सुधारमा ध्यान दिनुपर्छ।",
    translation: "The same problem returns every monsoon. More attention should be given to road improvement.",
    carrierLabel: "Public social post",
    topic: "Infrastructure concern",
    narrative: { claim: "Recurring disruption indicates a need for stronger road resilience.", frame: "Infrastructure Preparedness", family: "Preparedness & continuity", relation: "supports" },
    sentiment: { holder: "Public social author", target: "Road infrastructure", aspect: "Monsoon preparedness", polarity: "negative", polarityValue: -0.82, intensity: 0.86, recurrence: 4 },
    emotion: { category: "frustration", valence: -0.76, arousal: 0.7, recurrence: 3, attribution: "direct", experiencer: "Public social author", trigger: "Repeated monsoon disruption", object: "Road improvement" },
    placeLabels: ["नेपाल", "Nepal"], canonicalPlace: "Nepal", sourceFamily: "Public social material", verificationRelation: "context-only",
  },
  {
    id: "ne-social-safety",
    semanticLabel: "Nepali Social",
    language: "ne",
    languageLabel: "नेपाली",
    sourceType: "social",
    originalText: "अहिले जोखिम भएको ठाउँमा यात्रा नगर्नु नै राम्रो हुन्छ।",
    translation: "It is better to avoid travelling through areas that are currently at risk.",
    carrierLabel: "Public social post",
    topic: "Safety concern",
    narrative: { claim: "Avoiding identified risk areas is the safer immediate response.", frame: "Immediate Public Safety", family: "Safety response", relation: "supports" },
    sentiment: { holder: "Public social author", target: "Travel through risk areas", aspect: "Immediate safety", polarity: "negative", polarityValue: -0.52, intensity: 0.64, recurrence: 2 },
    emotion: { category: "concern", valence: -0.58, arousal: 0.61, recurrence: 3, attribution: "direct", experiencer: "Public social author", trigger: "Current travel risk", object: "Travel conditions" },
    placeLabels: ["नेपाल", "Nepal"], canonicalPlace: "Nepal", sourceFamily: "Public social material", verificationRelation: "context-only",
  },
  {
    id: "hi-news-restrictions",
    semanticLabel: "Hindi News",
    language: "hi",
    languageLabel: "हिन्दी",
    sourceType: "news",
    originalText: "भारी बारिश के कारण कई मार्गों पर यातायात प्रभावित हुआ है और प्रशासन ने कुछ क्षेत्रों में अस्थायी प्रतिबंध लगाए हैं।",
    translation: "Heavy rainfall has disrupted traffic on several routes, and authorities have introduced temporary restrictions in some areas.",
    carrierLabel: "Regional news report",
    topic: "Transport restriction",
    narrative: { claim: "Temporary restrictions respond to changing rainfall conditions.", frame: "Temporary Disruption", family: "Qualification", relation: "qualifies" },
    sentiment: { holder: "News report", target: "Temporary restrictions", aspect: "Operational response", polarity: "neutral", polarityValue: 0.02, intensity: 0.3, recurrence: 2 },
    emotion: { category: "unresolved", valence: -0.06, arousal: 0.25, recurrence: 1, attribution: "not-expressed", experiencer: "Not expressed", trigger: "Rainfall restrictions", object: "Transport access" },
    placeLabels: ["दिल्ली", "Delhi"], canonicalPlace: "Delhi", sourceFamily: "Regional reporting", verificationRelation: "unreviewed",
  },
  {
    id: "hi-social-infrastructure",
    semanticLabel: "Hindi Social",
    language: "hi",
    languageLabel: "हिन्दी",
    sourceType: "social",
    originalText: "अगर हर मानसून में सड़कें बंद होती हैं तो बुनियादी ढांचे पर गंभीर काम होना चाहिए।",
    translation: "If roads close every monsoon, serious work on infrastructure is needed.",
    carrierLabel: "Public social post",
    topic: "Infrastructure criticism",
    narrative: { claim: "Repeated closures point to insufficient infrastructure preparedness.", frame: "Infrastructure Preparedness", family: "Preparedness & continuity", relation: "supports" },
    sentiment: { holder: "Public social author", target: "Road infrastructure", aspect: "Monsoon preparedness", polarity: "negative", polarityValue: -0.9, intensity: 0.92, recurrence: 5 },
    emotion: { category: "frustration", valence: -0.84, arousal: 0.77, recurrence: 4, attribution: "direct", experiencer: "Public social author", trigger: "Recurring road closures", object: "Infrastructure preparedness" },
    placeLabels: ["उत्तर भारत", "Northern India"], canonicalPlace: "Northern India", sourceFamily: "Public social material", verificationRelation: "context-only",
  },
  {
    id: "hi-social-information",
    semanticLabel: "Hindi Social",
    language: "hi",
    languageLabel: "हिन्दी",
    sourceType: "social",
    originalText: "लोगों को समय पर सही जानकारी मिले तो अनावश्यक यात्रा से बचा जा सकता है।",
    translation: "If people receive accurate information in time, unnecessary travel can be avoided.",
    carrierLabel: "Public social post",
    topic: "Information availability",
    narrative: { claim: "Timely local information can reduce unnecessary travel.", frame: "Information & Coordination", family: "Coordination", relation: "supports" },
    sentiment: { holder: "Public social author", target: "Public information", aspect: "Timeliness", polarity: "mixed", polarityValue: 0.24, intensity: 0.58, recurrence: 3 },
    emotion: { category: "hope", valence: 0.36, arousal: 0.45, recurrence: 2, attribution: "direct", experiencer: "Public social author", trigger: "Availability of timely information", object: "Safer travel decisions" },
    placeLabels: ["नई दिल्ली", "New Delhi"], canonicalPlace: "New Delhi", sourceFamily: "Public social material", verificationRelation: "context-only",
  },
  {
    id: "en-official-guidance",
    semanticLabel: "English Official",
    language: "en",
    languageLabel: "English",
    sourceType: "official",
    originalText: "Temporary travel restrictions remain in effect in identified high-risk sections. Travellers are advised to follow local authority notices.",
    carrierLabel: "Official public notice",
    topic: "Travel guidance",
    narrative: { claim: "Travel restrictions are a temporary safety measure tied to identified risk sections.", frame: "Immediate Public Safety", family: "Safety response", relation: "supports" },
    sentiment: { holder: "Public institution", target: "Travel restrictions", aspect: "Safety purpose", polarity: "neutral", polarityValue: 0.08, intensity: 0.22, recurrence: 3 },
    emotion: { category: "unresolved", valence: 0, arousal: 0.12, recurrence: 1, attribution: "not-expressed", experiencer: "Not expressed", trigger: "Official travel guidance", object: "Travel conditions" },
    sourceFamily: "Official public information", verificationRelation: "unreviewed",
  },
  {
    id: "en-institutional-status",
    semanticLabel: "Institutional Update",
    language: "en",
    languageLabel: "English",
    sourceType: "official",
    originalText: "Road access is being reviewed as rainfall conditions change. Restrictions may differ by locality.",
    carrierLabel: "Institutional update",
    topic: "Operational status",
    narrative: { claim: "Access decisions remain local and may change with conditions.", frame: "Temporary Disruption", family: "Qualification", relation: "contests" },
    sentiment: { holder: "Public institution", target: "Road access", aspect: "Changing operational status", polarity: "unresolved", polarityValue: 0, intensity: 0.15, recurrence: 1 },
    emotion: { category: "unresolved", valence: 0, arousal: 0.08, recurrence: 1, attribution: "not-expressed", experiencer: "Not expressed", trigger: "Changing rainfall conditions", object: "Road access" },
    sourceFamily: "Official public information", verificationRelation: "unreviewed",
  },
  {
    id: "ne-news-attributed-concern",
    semanticLabel: "Nepali News",
    language: "ne",
    languageLabel: "नेपाली",
    sourceType: "news",
    originalText: "स्थानीय बासिन्दाले पटकपटक सडक अवरुद्ध हुँदा चिन्ता व्यक्त गरेका छन्।",
    translation: "Local residents have expressed concern about repeated road disruptions.",
    carrierLabel: "Local news report",
    topic: "Attributed public concern",
    narrative: { claim: "Residents describe repeated disruption as an ongoing concern.", frame: "Multi-frame", family: "Preparedness & continuity", relation: "multi-frame" },
    sentiment: { holder: "Local residents", target: "Road access", aspect: "Repeated disruption", polarity: "negative", polarityValue: -0.66, intensity: 0.72, recurrence: 3 },
    emotion: { category: "concern", valence: -0.62, arousal: 0.63, recurrence: 3, attribution: "reported", experiencer: "Local residents", trigger: "Repeated road disruption", object: "Transport conditions" },
    placeLabels: ["नेपाल", "Nepal"], canonicalPlace: "Nepal", sourceFamily: "Local reporting", verificationRelation: "context-only",
  },
  {
    id: "hi-official-locality",
    semanticLabel: "Hindi Official",
    language: "hi",
    languageLabel: "हिन्दी",
    sourceType: "official",
    originalText: "स्थानीय परिस्थितियों के अनुसार मार्ग संबंधी सूचना बदल सकती है। यात्रियों को नवीनतम सार्वजनिक सूचना देखने की सलाह दी गई है।",
    translation: "Route information may change according to local conditions. Travellers are advised to consult the latest public information.",
    carrierLabel: "Public information notice",
    topic: "Local information update",
    narrative: { claim: "Local route information should be checked as conditions change.", frame: "Information & Coordination", family: "Coordination", relation: "supports" },
    sentiment: { holder: "Public institution", target: "Route information", aspect: "Availability", polarity: "neutral", polarityValue: 0.12, intensity: 0.2, recurrence: 2 },
    emotion: { category: "unresolved", valence: 0, arousal: 0.1, recurrence: 1, attribution: "not-expressed", experiencer: "Not expressed", trigger: "Changing local conditions", object: "Route information" },
    placeLabels: ["उत्तर भारत", "Northern India"], canonicalPlace: "Northern India", sourceFamily: "Official public information", verificationRelation: "unreviewed",
  },
];

export const languageOptions = [
  { value: "all", label: "All Languages" },
  { value: "ne", label: "नेपाली" },
  { value: "hi", label: "हिन्दी" },
  { value: "en", label: "English" },
] as const;
export const sourceOptions = [
  { value: "all", label: "All Sources" },
  { value: "news", label: "News" },
  { value: "social", label: "Social" },
  { value: "official", label: "Official" },
] as const;
