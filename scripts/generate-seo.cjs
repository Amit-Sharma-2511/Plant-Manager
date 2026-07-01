const fs = require('fs');
const path = require('path');

const BASE_SPECIES = [
  "Pothos", "Snake Plant", "Aloe Vera", "Spider Plant", "Peace Lily", "ZZ Plant",
  "Monstera", "Boston Fern", "Jade Plant", "English Ivy", "Fiddle Leaf Fig",
  "Rubber Plant", "Chinese Evergreen", "Cast Iron Plant", "Croton", "Zebra Plant",
  "Nerve Plant", "Prayer Plant", "Chinese Money Plant", "Calathea", "Basil",
  "Mint", "Rosemary", "Lavender", "Thyme", "Oregano", "Sage", "Parsley",
  "Coriander", "Dill", "Fennel", "Chives", "Lemongrass", "Bay Leaf", "Rose",
  "Marigold", "Jasmine", "Sunflower", "Hibiscus", "Bougainvillea", "Petunia",
  "Dahlia", "Tulip", "Daisy", "Orchid", "Chrysanthemum", "Hydrangea",
  "Morning Glory", "Cactus", "Neem", "Ashwagandha", "Giloy", "Tulsi", "Turmeric",
  "Ginger", "Moringa", "Amla", "Brahmi", "Tomato", "Potato", "Onion", "Garlic",
  "Carrot", "Cabbage", "Spinach", "Broccoli", "Cucumber", "Eggplant",
  "Chili Pepper", "Mango", "Apple", "Orange", "Lemon", "Banana", "Strawberry",
  "Blueberry", "Avocado", "Grapes", "Coconut", "Fig", "Pineapple", "Oak",
  "Maple", "Pine", "Cedar", "Banyan", "Peepal", "Cherry Blossom", "Teak",
  "Mahogany", "Sandalwood"
];

const VARIATIONS = [
  "{plant} care guide",
  "{plant} growing guide",
  "how to grow {plant}",
  "how to care for {plant}",
  "best soil for {plant}",
  "best fertilizer for {plant}",
  "best pot for {plant}",
  "watering schedule for {plant}",
  "sunlight requirements for {plant}",
  "temperature for {plant}",
  "humidity for {plant}",
  "propagation of {plant}",
  "pruning {plant}",
  "repotting {plant}",
  "common diseases of {plant}",
  "pests affecting {plant}",
  "yellow leaves on {plant}",
  "brown leaves on {plant}",
  "{plant} not growing",
  "{plant} care indoors",
  "{plant} care outdoors",
  "growing {plant} in pots",
  "growing {plant} from seeds",
  "growing {plant} from cuttings",
  "benefits of {plant}",
  "uses of {plant}",
  "is {plant} poisonous",
  "is {plant} pet friendly",
  "is {plant} edible",
  "how long does {plant} take to grow",
  "how often to water {plant}",
  "when to fertilize {plant}"
];

const INTENT_HEADINGS = {
  "How to": ["how to water plants", "how to fertilize plants", "how to report root rot"],
  "Best": ["best soil mix", "best organic fertilizer", "best indoor plants", "best pots for drainage"],
  "Why": ["why are plant leaves turning yellow", "why is my plant wilting", "why do indoor plants die"],
  "When": ["when to water plants", "when to transplant crops", "when to prune flowers"],
  "Which": ["which plants need low light", "which herbs grow in winter", "which crops are pest resistant"],
  "Can I": ["can I grow tomatoes in winter", "can I propagate plants in water", "can I reuse old potting soil"],
  "Toxicity & Safety": ["is it safe for dogs", "is it poisonous to cats", "is it edible for humans"],
  "Problem Troubleshooting": ["yellow leaves", "brown spots", "white mold on soil", "stunted growth"]
};

function main() {
  const database = [];

  // 1. General SEO Supporting Keywords
  const generalKeywords = [
    "plant care guide", "basic plant care guide", "indoor plant care guide", "outdoor plant care guide",
    "house plant care guide", "plant care tips", "plant growing guide", "plant management",
    "plant encyclopedia", "plant database", "gardening guide", "home gardening", "kitchen gardening",
    "balcony gardening", "terrace gardening", "organic gardening", "urban gardening", "sustainable gardening",
    "gardening for beginners", "plant watering guide", "plant fertilizer guide", "plant soil guide",
    "plant diseases", "plant pests", "plant identification", "plant growth tips", "gardening tips"
  ];
  database.push({
    clusterName: "Core Gardening & Plant Management",
    keywords: generalKeywords
  });

  // 2. Major Plant Category Keywords
  const categoryKeywords = [
    "indoor plants", "outdoor plants", "house plants", "succulents", "cactus", "herbs", "vegetables",
    "fruits", "flowers", "trees", "medicinal plants", "bonsai", "aquatic plants", "air purifying plants",
    "pet friendly plants", "tropical plants", "native plants", "rare plants", "shrubs", "climbers",
    "creepers", "evergreen plants", "flowering plants", "ornamental plants"
  ];
  database.push({
    clusterName: "Plant Categories & Collections",
    keywords: categoryKeywords
  });

  // 3. Search Intent Clusters
  for (const [intent, examples] of Object.entries(INTENT_HEADINGS)) {
    database.push({
      clusterName: `Search Intent - ${intent}`,
      keywords: examples
    });
  }

  // 4. Plant-Specific Keyword Clusters (Generated for all 91 species)
  for (const plant of BASE_SPECIES) {
    const plantKeywords = VARIATIONS.map(v => v.replace(/{plant}/g, plant));
    database.push({
      clusterName: `${plant} Keyword Cluster`,
      keywords: plantKeywords
    });
  }

  const destPath = path.join(__dirname, '../public/seo-keywords.json');
  fs.writeFileSync(destPath, JSON.stringify(database, null, 2));

  let totalKeywordsCount = 0;
  database.forEach(cluster => {
    totalKeywordsCount += cluster.keywords.length;
  });

  console.log(`Generated SEO database with ${database.length} clusters and a total of ${totalKeywordsCount} optimized keywords!`);
}

main();
