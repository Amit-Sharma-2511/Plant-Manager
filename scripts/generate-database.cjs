const fs = require('fs');
const path = require('path');

const PLANTS_DIR = path.join(__dirname, '../src/content/plants');
const LEGALITY_DIR = path.join(__dirname, '../src/content/legality');

// Ensure directories exist
if (!fs.existsSync(PLANTS_DIR)) fs.mkdirSync(PLANTS_DIR, { recursive: true });
if (!fs.existsSync(LEGALITY_DIR)) fs.mkdirSync(LEGALITY_DIR, { recursive: true });

// Variety suffixes to generate realistic cultivars
const VARIETIES = [
  { prefix: "Standard", sciSuffix: "typica", desc: "the standard variety commonly cultivated in gardens and homes." },
  { prefix: "Golden", sciSuffix: "aureum", desc: "featuring bright yellow variegation or golden margins on the leaves." },
  { prefix: "Silver", sciSuffix: "argentea", desc: "displaying metallic silvery veins or highlights on the leaves." },
  { prefix: "Neon", sciSuffix: "luteum", desc: "with electric lime-green foliage that brightens shady corners." },
  { prefix: "Variegated", sciSuffix: "variegata", desc: "displaying unique white, cream, and green marbling." },
  { prefix: "Dwarf", sciSuffix: "pumila", desc: "a compact cultivar excellent for small containers and indoor shelves." },
  { prefix: "Giant", sciSuffix: "gigantea", desc: "a robust variety producing foliage much larger than the type species." },
  { prefix: "Sweet", sciSuffix: "dulcis", desc: "releasing highly aromatic oils when touched." },
  { prefix: "Wild", sciSuffix: "sylvestris", desc: "the hardy ancestral variety found naturally in native woodlands." },
  { prefix: "Alpine", sciSuffix: "alpinus", desc: "a cold-hardy cultivar adapted to low temperatures and rocky soils." },
  { prefix: "Emerald", sciSuffix: "smaragdinus", desc: "characterized by deep, glossy emerald-green foliage." }
];

// Local mappings for 12 primary generated illustrations
const MAIN_PLANTS_MAP = {
  "Pothos": "/images/plants/money-plant.png",
  "Snake Plant": "/images/plants/snake-plant.png",
  "Aloe Vera": "/images/plants/aloe-vera.png",
  "Spider Plant": "/images/plants/spider-plant.png",
  "Peace Lily": "/images/plants/peace-lily.png",
  "Basil": "/images/plants/basil.png",
  "Lavender": "/images/plants/lavender.png",
  "Neem": "/images/plants/neem.png",
  "Mango": "/images/plants/mango.png",
  "Potato": "/images/plants/potato.png",
  "Tomato": "/images/plants/tomato.png",
  "Rose": "/images/plants/rose.png"
};

// 100 Real-World Plant Species templates
const BASE_SPECIES = [
  // INDOOR / ORNAMENTAL
  { name: "Pothos", scientific: "Epipremnum aureum", family: "Araceae", origin: "French Polynesia", zones: ["10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "10+ years", categories: ["indoor-plants", "air-purifying-plants", "low-maintenance-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright indirect light", temp: "15°C - 30°C", hum: "50-70%" },
  { name: "Snake Plant", scientific: "Sansevieria trifasciata", family: "Asparagaceae", origin: "West Africa", zones: ["9", "10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "15+ years", categories: ["indoor-plants", "succulents", "low-maintenance-plants"], water: "Low", waterFreq: "Every 2-3 weeks", sun: "Low to bright indirect", temp: "15°C - 27°C", hum: "30-50%" },
  { name: "Aloe Vera", scientific: "Aloe barbadensis", family: "Asphodelaceae", origin: "Arabian Peninsula", zones: ["8", "9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "12+ years", categories: ["indoor-plants", "succulents", "medicinal-plants"], water: "Low", waterFreq: "Every 2-3 weeks", sun: "Direct sunlight", temp: "13°C - 27°C", hum: "Low" },
  { name: "Spider Plant", scientific: "Chlorophytum comosum", family: "Asparagaceae", origin: "South Africa", zones: ["9", "10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "10+ years", categories: ["indoor-plants", "pet-friendly-plants", "air-purifying-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright indirect", temp: "13°C - 27°C", hum: "40-60%" },
  { name: "Peace Lily", scientific: "Spathiphyllum wallisii", family: "Araceae", origin: "Colombia", zones: ["11", "12"], indoorOutdoor: "Indoor", difficulty: "Medium", lifespan: "8+ years", categories: ["indoor-plants", "flowers", "air-purifying-plants"], water: "High", waterFreq: "Every 5-7 days", sun: "Low to moderate indirect", temp: "18°C - 27°C", hum: "60%+" },
  { name: "ZZ Plant", scientific: "Zamioculcas zamiifolia", family: "Araceae", origin: "East Africa", zones: ["10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "10+ years", categories: ["indoor-plants", "low-maintenance-plants"], water: "Low", waterFreq: "Every 2-3 weeks", sun: "Low to bright indirect", temp: "15°C - 24°C", hum: "Low to average" },
  { name: "Monstera", scientific: "Monstera deliciosa", family: "Araceae", origin: "Mexico", zones: ["10", "11", "12"], indoorOutdoor: "Indoor", difficulty: "Medium", lifespan: "15+ years", categories: ["indoor-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright indirect", temp: "18°C - 30°C", hum: "60%+" },
  { name: "Boston Fern", scientific: "Nephrolepis exaltata", family: "Lomariopsidaceae", origin: "Americas", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "10+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 3-5 days", sun: "Partial shade", temp: "16°C - 24°C", hum: "70%+" },
  { name: "Jade Plant", scientific: "Crassula ovata", family: "Crassulaceae", origin: "South Africa", zones: ["10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "50+ years", categories: ["indoor-plants", "succulents"], water: "Low", waterFreq: "Every 2-3 weeks", sun: "Full sun", temp: "15°C - 24°C", hum: "Low" },
  { name: "English Ivy", scientific: "Hedera helix", family: "Araliaceae", origin: "Europe", zones: ["4", "5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "30+ years", categories: ["indoor-plants", "low-maintenance-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun to shade", temp: "10°C - 22°C", hum: "Moderate" },
  { name: "Fiddle Leaf Fig", scientific: "Ficus lyrata", family: "Moraceae", origin: "West Africa", zones: ["10", "11"], indoorOutdoor: "Indoor", difficulty: "Hard", lifespan: "15+ years", categories: ["indoor-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright consistent indirect", temp: "18°C - 24°C", hum: "60%+" },
  { name: "Rubber Plant", scientific: "Ficus elastica", family: "Moraceae", origin: "Asia", zones: ["10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "20+ years", categories: ["indoor-plants", "air-purifying-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright indirect", temp: "15°C - 29°C", hum: "50%+" },
  { name: "Chinese Evergreen", scientific: "Aglaonema commutatum", family: "Araceae", origin: "Southeast Asia", zones: ["10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "10+ years", categories: ["indoor-plants", "low-maintenance-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Low to bright indirect", temp: "18°C - 27°C", hum: "50%+" },
  { name: "Cast Iron Plant", scientific: "Aspidistra elatior", family: "Asparagaceae", origin: "Japan", zones: ["7", "8", "9", "10", "11"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "20+ years", categories: ["indoor-plants", "low-maintenance-plants", "pet-friendly-plants"], water: "Low", waterFreq: "Every 10-14 days", sun: "Shade to partial light", temp: "10°C - 27°C", hum: "Low to average" },
  { name: "Croton", scientific: "Codiaeum variegatum", family: "Euphorbiaceae", origin: "Pacific Islands", zones: ["11", "12"], indoorOutdoor: "Both", difficulty: "Hard", lifespan: "10+ years", categories: ["indoor-plants"], water: "High", waterFreq: "Every 3-5 days", sun: "Full direct sun", temp: "18°C - 29°C", hum: "70%+" },
  { name: "Zebra Plant", scientific: "Aphelandra squarrosa", family: "Acanthaceae", origin: "Brazil", zones: ["11", "12"], indoorOutdoor: "Indoor", difficulty: "Hard", lifespan: "5+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 3-5 days", sun: "Bright indirect", temp: "18°C - 24°C", hum: "70%+" },
  { name: "Nerve Plant", scientific: "Fittonia albivenis", family: "Acanthaceae", origin: "Peru", zones: ["11", "12"], indoorOutdoor: "Indoor", difficulty: "Medium", lifespan: "5+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Partial shade", temp: "18°C - 26°C", hum: "80%+" },
  { name: "Prayer Plant", scientific: "Maranta leuconeura", family: "Marantaceae", origin: "Brazil", zones: ["11", "12"], indoorOutdoor: "Indoor", difficulty: "Medium", lifespan: "10+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 5-7 days", sun: "Indirect shade", temp: "18°C - 27°C", hum: "60%+" },
  { name: "Chinese Money Plant", scientific: "Pilea peperomioides", family: "Urticaceae", origin: "China", zones: ["9", "10"], indoorOutdoor: "Indoor", difficulty: "Easy", lifespan: "10+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright indirect", temp: "15°C - 24°C", hum: "50%+" },
  { name: "Calathea", scientific: "Goeppertia picturata", family: "Marantaceae", origin: "South America", zones: ["11", "12"], indoorOutdoor: "Indoor", difficulty: "Hard", lifespan: "5+ years", categories: ["indoor-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 5-7 days", sun: "Moderate indirect", temp: "18°C - 24°C", hum: "70%+" },

  // HERBS
  { name: "Basil", scientific: "Ocimum basilicum", family: "Lamiaceae", origin: "India", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "Annual", categories: ["herbs", "medicinal-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "21°C - 30°C", hum: "50-60%" },
  { name: "Mint", scientific: "Mentha spicata", family: "Lamiaceae", origin: "Europe", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial", categories: ["herbs", "medicinal-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun to shade", temp: "13°C - 24°C", hum: "60%+" },
  { name: "Rosemary", scientific: "Salvia rosmarinus", family: "Lamiaceae", origin: "Mediterranean", zones: ["7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "15+ years", categories: ["herbs", "medicinal-plants"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "15°C - 28°C", hum: "Low" },
  { name: "Lavender", scientific: "Lavandula angustifolia", family: "Lamiaceae", origin: "Mediterranean", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "10+ years", categories: ["outdoor-plants", "flowers", "herbs", "medicinal-plants"], water: "Low", waterFreq: "Every 10-14 days", sun: "Full sun", temp: "15°C - 25°C", hum: "Low" },
  { name: "Thyme", scientific: "Thymus vulgaris", family: "Lamiaceae", origin: "Mediterranean", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "5+ years", categories: ["herbs", "pet-friendly-plants"], water: "Low", waterFreq: "Every 10-14 days", sun: "Full sun", temp: "15°C - 28°C", hum: "Low" },
  { name: "Oregano", scientific: "Origanum vulgare", family: "Lamiaceae", origin: "Mediterranean", zones: ["5", "6", "7", "8", "9", "10"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial", categories: ["herbs", "pet-friendly-plants"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "15°C - 27°C", hum: "Low" },
  { name: "Sage", scientific: "Salvia officinalis", family: "Lamiaceae", origin: "Europe", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "Perennial", categories: ["herbs", "medicinal-plants"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "15°C - 26°C", hum: "Low" },
  { name: "Parsley", scientific: "Petroselinum crispum", family: "Apiaceae", origin: "Mediterranean", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Biennial", categories: ["herbs"], water: "Moderate", waterFreq: "Every 3-5 days", sun: "Full sun to partial shade", temp: "10°C - 24°C", hum: "Moderate" },
  { name: "Coriander", scientific: "Coriandrum sativum", family: "Apiaceae", origin: "Southern Europe", zones: ["3", "4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Annual", categories: ["herbs", "pet-friendly-plants"], water: "Moderate", waterFreq: "Every 3-5 days", sun: "Partial sun", temp: "10°C - 24°C", hum: "Moderate" },
  { name: "Dill", scientific: "Anethum graveolens", family: "Apiaceae", origin: "Mediterranean", zones: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["herbs", "pet-friendly-plants"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun", temp: "15°C - 26°C", hum: "Low to average" },
  { name: "Fennel", scientific: "Foeniculum vulgare", family: "Apiaceae", origin: "Mediterranean", zones: ["4", "5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Perennial", categories: ["herbs"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun", temp: "15°C - 27°C", hum: "Moderate" },
  { name: "Chives", scientific: "Allium schoenoprasum", family: "Amaryllidaceae", origin: "Europe & Asia", zones: ["3", "4", "5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial", categories: ["herbs"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun", temp: "12°C - 25°C", hum: "Moderate" },
  { name: "Lemongrass", scientific: "Cymbopogon citratus", family: "Poaceae", origin: "Maritime Southeast Asia", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Perennial", categories: ["herbs", "medicinal-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "20°C - 35°C", hum: "High" },
  { name: "Bay Leaf", scientific: "Laurus nobilis", family: "Lauraceae", origin: "Mediterranean", zones: ["8", "9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "50+ years", categories: ["herbs", "trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun to partial shade", temp: "15°C - 25°C", hum: "Moderate" },

  // FLOWERS / OUTDOOR
  { name: "Rose", scientific: "Rosa hybrid", family: "Rosaceae", origin: "Asia", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "15+ years", categories: ["outdoor-plants", "flowers", "pet-friendly-plants"], water: "High", waterFreq: "Deeply twice a week", sun: "Full sun", temp: "15°C - 25°C", hum: "40-60%" },
  { name: "Marigold", scientific: "Tagetes erecta", family: "Asteraceae", origin: "Mexico", zones: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["outdoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 3-4 days", sun: "Full sun", temp: "18°C - 32°C", hum: "Average" },
  { name: "Jasmine", scientific: "Jasminum officinale", family: "Oleaceae", origin: "Himalayas", zones: ["7", "8", "9", "10"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "10+ years", categories: ["outdoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun", temp: "15°C - 27°C", hum: "High" },
  { name: "Sunflower", scientific: "Helianthus annuus", family: "Asteraceae", origin: "North America", zones: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["outdoor-plants", "flowers", "pet-friendly-plants"], water: "High", waterFreq: "Every 3-4 days", sun: "Full sun", temp: "18°C - 33°C", hum: "Moderate" },
  { name: "Hibiscus", scientific: "Hibiscus rosa-sinensis", family: "Malvaceae", origin: "East Asia", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "20+ years", categories: ["outdoor-plants", "flowers"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "18°C - 32°C", hum: "High" },
  { name: "Bougainvillea", scientific: "Bougainvillea spectabilis", family: "Nyctaginaceae", origin: "South America", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "30+ years", categories: ["outdoor-plants", "flowers"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "22°C - 38°C", hum: "Low to moderate" },
  { name: "Petunia", scientific: "Petunia hybrida", family: "Solanaceae", origin: "South America", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["outdoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 3-4 days", sun: "Full sun", temp: "15°C - 30°C", hum: "Average" },
  { name: "Dahlia", scientific: "Dahlia hortensis", family: "Asteraceae", origin: "Mexico", zones: ["8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Perennial (Tubers)", categories: ["outdoor-plants", "flowers"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "15°C - 26°C", hum: "Moderate" },
  { name: "Tulip", scientific: "Tulipa gesneriana", family: "Liliaceae", origin: "Central Asia", zones: ["3", "4", "5", "6", "7", "8"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Perennial (Bulbs)", categories: ["outdoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun to partial shade", temp: "5°C - 18°C", hum: "Average" },
  { name: "Daisy", scientific: "Bellis perennis", family: "Asteraceae", origin: "Europe", zones: ["4", "5", "6", "7", "8"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Perennial", categories: ["outdoor-plants", "flowers", "pet-friendly-plants"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun to partial shade", temp: "12°C - 24°C", hum: "Average" },
  { name: "Orchid", scientific: "Phalaenopsis", family: "Orchidaceae", origin: "Southeast Asia", zones: ["10", "11", "12"], indoorOutdoor: "Indoor", difficulty: "Hard", lifespan: "15+ years", categories: ["indoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Bright filtered indirect", temp: "18°C - 29°C", hum: "65%+" },
  { name: "Chrysanthemum", scientific: "Chrysanthemum morifolium", family: "Asteraceae", origin: "China", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial", categories: ["outdoor-plants", "flowers"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "15°C - 24°C", hum: "Moderate" },
  { name: "Hydrangea", scientific: "Hydrangea macrophylla", family: "Hydrangeaceae", origin: "Japan", zones: ["5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "20+ years", categories: ["outdoor-plants", "flowers"], water: "High", waterFreq: "Every 2-3 days", sun: "Morning sun, afternoon shade", temp: "15°C - 24°C", hum: "High" },
  { name: "Morning Glory", scientific: "Ipomoea purpurea", family: "Convolvulaceae", origin: "Central America", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["outdoor-plants", "flowers"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun", temp: "18°C - 30°C", hum: "Moderate" },
  { name: "Cactus", scientific: "Cereus hildmannianus", family: "Cactaceae", origin: "South America", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "100+ years", categories: ["indoor-plants", "desert-plants", "succulents"], water: "Low", waterFreq: "Every 3-4 weeks", sun: "Direct full sun", temp: "15°C - 35°C", hum: "Low" },

  // MEDICINAL
  { name: "Neem", scientific: "Azadirachta indica", family: "Meliaceae", origin: "India", zones: ["10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "150+ years", categories: ["outdoor-plants", "medicinal-plants", "trees"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "25°C - 38°C", hum: "Low to moderate" },
  { name: "Ashwagandha", scientific: "Withania somnifera", family: "Solanaceae", origin: "India", zones: ["9", "10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Perennial Shrub", categories: ["outdoor-plants", "medicinal-plants"], water: "Low", waterFreq: "Every 10-14 days", sun: "Full sun", temp: "20°C - 35°C", hum: "Low" },
  { name: "Giloy", scientific: "Tinospora cordifolia", family: "Menispermaceae", origin: "India", zones: ["9", "10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Perennial Climber", categories: ["outdoor-plants", "medicinal-plants"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun to partial shade", temp: "18°C - 35°C", hum: "High" },
  { name: "Tulsi", scientific: "Ocimum tenuiflorum", family: "Lamiaceae", origin: "India", zones: ["10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Short-lived Perennial", categories: ["herbs", "medicinal-plants", "pet-friendly-plants"], water: "Moderate", waterFreq: "Daily in summer, weekly in winter", sun: "Full sun", temp: "15°C - 35°C", hum: "Moderate to high" },
  { name: "Turmeric", scientific: "Curcuma longa", family: "Zingiberaceae", origin: "India", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "Perennial (Rhizomes)", categories: ["medicinal-plants"], water: "High", waterFreq: "Every 3-5 days", sun: "Partial sun", temp: "20°C - 35°C", hum: "70%+" },
  { name: "Ginger", scientific: "Zingiber officinale", family: "Zingiberaceae", origin: "Southeast Asia", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "Perennial (Rhizomes)", categories: ["medicinal-plants"], water: "High", waterFreq: "Every 3-5 days", sun: "Dappled sunlight", temp: "20°C - 35°C", hum: "75%+" },
  { name: "Moringa", scientific: "Moringa oleifera", family: "Moringaceae", origin: "Himalayas", zones: ["9", "10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "25+ years", categories: ["medicinal-plants", "trees"], water: "Low", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "25°C - 40°C", hum: "Low to average" },
  { name: "Amla", scientific: "Phyllanthus emblica", family: "Phyllanthaceae", origin: "Tropical India", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "75+ years", categories: ["medicinal-plants", "trees", "fruit-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "25°C - 35°C", hum: "Moderate" },
  { name: "Brahmi", scientific: "Bacopa monnieri", family: "Plantaginaceae", origin: "Wetlands worldwide", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial", categories: ["medicinal-plants", "pet-friendly-plants"], water: "High", waterFreq: "Keep soil saturated", sun: "Full sun to partial shade", temp: "15°C - 30°C", hum: "80%+" },

  // FRUITS & VEGETABLES
  { name: "Tomato", scientific: "Solanum lycopersicum", family: "Solanaceae", origin: "South America", zones: ["3", "4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Annual", categories: ["outdoor-plants", "vegetables", "fruit-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "21°C - 29°C", hum: "50-70%" },
  { name: "Potato", scientific: "Solanum tuberosum", family: "Solanaceae", origin: "Andes", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["outdoor-plants", "vegetables"], water: "Moderate", waterFreq: "Every 4-7 days", sun: "Full sun", temp: "15°C - 20°C", hum: "50-60%" },
  { name: "Onion", scientific: "Allium cepa", family: "Amaryllidaceae", origin: "Central Asia", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Biennial (Grown as annual)", categories: ["vegetables"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun", temp: "13°C - 24°C", hum: "Moderate" },
  { name: "Garlic", scientific: "Allium sativum", family: "Amaryllidaceae", origin: "Central Asia", zones: ["4", "5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Perennial (Annual bulb)", categories: ["vegetables", "medicinal-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "10°C - 24°C", hum: "Moderate" },
  { name: "Carrot", scientific: "Daucus carota", family: "Apiaceae", origin: "Europe & Asia", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Biennial (Annual harvest)", categories: ["vegetables"], water: "Moderate", waterFreq: "Every 4-5 days", sun: "Full sun to partial shade", temp: "12°C - 21°C", hum: "Moderate" },
  { name: "Cabbage", scientific: "Brassica oleracea var. capitata", family: "Brassicaceae", origin: "Southern Europe", zones: ["2", "3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Annual", categories: ["vegetables"], water: "High", waterFreq: "Every 3-5 days", sun: "Full sun", temp: "10°C - 20°C", hum: "60-70%" },
  { name: "Spinach", scientific: "Spinacia oleracea", family: "Amaranthaceae", origin: "Central Asia", zones: ["2", "3", "4", "5", "6", "7", "8", "9"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Annual", categories: ["vegetables"], water: "Moderate", waterFreq: "Every 3-4 days", sun: "Full sun to partial shade", temp: "8°C - 20°C", hum: "Average" },
  { name: "Broccoli", scientific: "Brassica oleracea var. italica", family: "Brassicaceae", origin: "Mediterranean", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Annual", categories: ["vegetables"], water: "High", waterFreq: "Every 3-5 days", sun: "Full sun", temp: "12°C - 20°C", hum: "Moderate" },
  { name: "Cucumber", scientific: "Cucumis sativus", family: "Cucurbitaceae", origin: "India", zones: ["4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "Annual", categories: ["vegetables", "pet-friendly-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "21°C - 32°C", hum: "60%+" },
  { name: "Eggplant", scientific: "Solanum melongena", family: "Solanaceae", origin: "India and China", zones: ["4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "Annual", categories: ["vegetables"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "21°C - 30°C", hum: "50-70%" },
  { name: "Chili Pepper", scientific: "Capsicum annuum", family: "Solanaceae", origin: "Mexico", zones: ["4", "5", "6", "7", "8", "9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "Perennial (grown as annual)", categories: ["vegetables"], water: "Moderate", waterFreq: "Every 3-5 days", sun: "Full sun", temp: "21°C - 32°C", hum: "Moderate" },
  { name: "Mango", scientific: "Mangifera indica", family: "Anacardiaceae", origin: "India", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "100+ years", categories: ["outdoor-plants", "fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "24°C - 35°C", hum: "50-80%" },
  { name: "Apple", scientific: "Malus domestica", family: "Rosaceae", origin: "Central Asia", zones: ["3", "4", "5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "50+ years", categories: ["fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "10°C - 25°C", hum: "Moderate" },
  { name: "Orange", scientific: "Citrus sinensis", family: "Rutaceae", origin: "Southern China", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "50+ years", categories: ["fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun", temp: "18°C - 32°C", hum: "Moderate" },
  { name: "Lemon", scientific: "Citrus limon", family: "Rutaceae", origin: "South Asia", zones: ["9", "10", "11"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "50+ years", categories: ["fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun", temp: "21°C - 32°C", hum: "Moderate" },
  { name: "Banana", scientific: "Musa acuminata", family: "Musaceae", origin: "Southeast Asia", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "15+ years", categories: ["fruit-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "24°C - 35°C", hum: "70%+" },
  { name: "Strawberry", scientific: "Fragaria ananassa", family: "Rosaceae", origin: "Europe", zones: ["3", "4", "5", "6", "7", "8", "9", "10"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "5+ years", categories: ["fruit-plants", "pet-friendly-plants"], water: "High", waterFreq: "Every 2-3 days", sun: "Full sun", temp: "15°C - 26°C", hum: "Moderate" },
  { name: "Blueberry", scientific: "Vaccinium corymbosum", family: "Ericaceae", origin: "North America", zones: ["3", "4", "5", "6", "7", "8"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "30+ years", categories: ["fruit-plants"], water: "High", waterFreq: "Every 3-4 days", sun: "Full sun", temp: "15°C - 25°C", hum: "Moderate" },
  { name: "Avocado", scientific: "Persea americana", family: "Lauraceae", origin: "Central America", zones: ["9", "10", "11"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "80+ years", categories: ["fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "18°C - 29°C", hum: "Moderate" },
  { name: "Grapes", scientific: "Vitis vinifera", family: "Vitaceae", origin: "Mediterranean", zones: ["6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "50+ years", categories: ["fruit-plants"], water: "Moderate", waterFreq: "Every 5-7 days", sun: "Full sun", temp: "15°C - 30°C", hum: "Average" },
  { name: "Coconut", scientific: "Cocos nucifera", family: "Arecaceae", origin: "Tropical Pacific", zones: ["10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "80+ years", categories: ["fruit-plants", "trees"], water: "High", waterFreq: "Every 3-4 days", sun: "Full sun", temp: "22°C - 35°C", hum: "80%+" },
  { name: "Fig", scientific: "Ficus carica", family: "Moraceae", origin: "Middle East", zones: ["7", "8", "9", "10", "11"], indoorOutdoor: "Both", difficulty: "Easy", lifespan: "50+ years", categories: ["fruit-plants", "trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "15°C - 30°C", hum: "Average" },
  { name: "Pineapple", scientific: "Ananas comosus", family: "Bromeliaceae", origin: "South America", zones: ["10", "11", "12"], indoorOutdoor: "Both", difficulty: "Medium", lifespan: "5+ years", categories: ["fruit-plants"], water: "Low", waterFreq: "Every 10-14 days", sun: "Full sun", temp: "18°C - 32°C", hum: "50%+" },

  // TREES / WOODLAND
  { name: "Oak", scientific: "Quercus robur", family: "Fagaceae", origin: "Europe", zones: ["3", "4", "5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "500+ years", categories: ["trees"], water: "Low", waterFreq: "Natural rainfall", sun: "Full sun", temp: "5°C - 25°C", hum: "Average" },
  { name: "Maple", scientific: "Acer saccharum", family: "Sapindaceae", origin: "North America", zones: ["3", "4", "5", "6", "7", "8"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "150+ years", categories: ["trees"], water: "Moderate", waterFreq: "Every 10-14 days when dry", sun: "Full sun to partial shade", temp: "5°C - 24°C", hum: "Average" },
  { name: "Pine", scientific: "Pinus sylvestris", family: "Pinaceae", origin: "Eurasia", zones: ["2", "3", "4", "5", "6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "100+ years", categories: ["trees"], water: "Low", waterFreq: "Natural rainfall", sun: "Full sun", temp: "0°C - 25°C", hum: "Low" },
  { name: "Cedar", scientific: "Cedrus libani", family: "Pinaceae", origin: "Mediterranean Mountains", zones: ["6", "7", "8", "9"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "300+ years", categories: ["trees"], water: "Low", waterFreq: "Natural rainfall", sun: "Full sun", temp: "10°C - 25°C", hum: "Low" },
  { name: "Banyan", scientific: "Ficus benghalensis", family: "Moraceae", origin: "India", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "200+ years", categories: ["trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "18°C - 35°C", hum: "High" },
  { name: "Peepal", scientific: "Ficus religiosa", family: "Moraceae", origin: "Indian Subcontinent", zones: ["10", "11", "12"], indoorOutdoor: "Outdoor", difficulty: "Easy", lifespan: "100+ years", categories: ["trees", "medicinal-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "18°C - 35°C", hum: "Moderate" },
  { name: "Cherry Blossom", scientific: "Prunus serrulata", family: "Rosaceae", origin: "Japan", zones: ["5", "6", "7", "8"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "30+ years", categories: ["trees", "flowers"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "10°C - 24°C", hum: "Average" },
  { name: "Teak", scientific: "Tectona grandis", family: "Lamiaceae", origin: "South & Southeast Asia", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "100+ years", categories: ["trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "20°C - 35°C", hum: "Moderate to high" },
  { name: "Mahogany", scientific: "Swietenia mahagoni", family: "Meliaceae", origin: "Caribbean", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Medium", lifespan: "150+ years", categories: ["trees"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "22°C - 35°C", hum: "Moderate to high" },
  { name: "Sandalwood", scientific: "Santalum album", family: "Santalaceae", origin: "Southern India", zones: ["10", "11"], indoorOutdoor: "Outdoor", difficulty: "Hard", lifespan: "80+ years", categories: ["trees", "medicinal-plants"], water: "Moderate", waterFreq: "Every 7-10 days", sun: "Full sun", temp: "20°C - 35°C", hum: "Moderate" }
];

const WIKI_PAGE_OVERRIDES = {
  "Pothos": "Epipremnum_aureum",
  "Snake Plant": "Dracaena_trifasciata",
  "Aloe Vera": "Aloe_vera",
  "Peace Lily": "Spathiphyllum",
  "ZZ Plant": "Zamioculcas",
  "Rose": "Rose",
  "Marigold": "Tagetes_erecta",
  "Hibiscus": "Hibiscus_%C3%97_rosa-sinensis",
  "Tomato": "Tomato",
  "Cherry Blossom": "Prunus_serrulata",
  "Tulsi": "Ocimum_tenuiflorum",
  "Amla": "Phyllanthus_emblica",
  "Grapes": "Vitis_vinifera",
  "Cactus": "Cactus",
  "Orchid": "Orchidaceae"
};

const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/A_Close_Up_Photo_of_a_Plant_%28Unsplash%29.jpg/1280px-A_Close_Up_Photo_of_a_Plant_%28Unsplash%29.jpg";

async function fetchWikiSummary(base) {
  const page = WIKI_PAGE_OVERRIDES[base.name] || base.scientific.replace(/\s+/g, "_");
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "GrowMyPlant local content generator (educational website)"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      overview: data.extract || speciesOverview(base),
      image: data.originalimage?.source || data.thumbnail?.source || FALLBACK_IMAGE,
      imageSource: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${page}`
    };
  } catch (error) {
    console.warn(`Wikipedia lookup failed for ${base.name}: ${error.message}`);
    return {
      overview: speciesOverview(base),
      image: FALLBACK_IMAGE,
      imageSource: `https://en.wikipedia.org/wiki/${page}`
    };
  }
}

function speciesOverview(base) {
  return `${base.name} (${base.scientific}) is a real plant in the ${base.family} family. It is commonly grown as a ${base.indoorOutdoor.toLowerCase()} plant and generally needs ${base.sun.toLowerCase()}, ${base.water.toLowerCase()} water, and temperatures around ${base.temp}.`;
}

function buildCare(base) {
  const lowWater = base.water === "Low";
  const edible = base.categories.includes("vegetables") || base.categories.includes("fruit-plants") || base.categories.includes("herbs");
  return {
    waterRequirement: `${base.water}. Adjust watering for season, pot size, heat, and soil drainage rather than using a fixed calendar only.`,
    waterFrequency: base.waterFreq,
    sunlightRequirement: base.sun,
    temperature: base.temp,
    humidity: base.hum,
    soilType: base.water === "Low" ? "Gritty, fast-draining cactus and succulent mix." : "Rich organic, well-draining loamy potting soil.",
    soilPh: "6.0 - 7.0 (Slightly acidic to neutral)",
    fertilizer: {
      type: "Balanced water-soluble organic fertilizer.",
      schedule: "Apply once a month during spring and summer months."
    },
    potSize: "6-10 inches, matching root volume.",
    repotting: "Repot every 2 years in spring for root health.",
    pruning: "Trim faded lower leaves and dry stems to maintain health.",
    propagationMethod: "Dividing root clumps or stem cuttings rooted in water.",
    companionPlants: ["money-plant", "snake-plant", "spider-plant"]
  };
}

function buildTimeline(base) {
  const isAnnual = base.lifespan.toLowerCase().includes("annual");
  return {
    germination: "7-14 days to sprout foliage.",
    growthRate: base.difficulty === "Easy" ? "Fast" : "Moderate",
    timeToMature: "1-2 years to reach full size.",
    floweringTime: base.categories.includes("flowers") ? "Spring and summer months." : undefined,
    fruitingTime: base.categories.includes("fruit-plants") ? "Fruiting follows flowering and successful pollination where the climate is suitable." : undefined,
    harvestTime: base.categories.includes("vegetables") || base.categories.includes("herbs") ? "Harvest timing depends on variety, planting date, and temperature." : undefined,
    averageHeight: "1-3 feet",
    averageWidth: "1-2 feet",
    growthStage: "Establish roots first, then support leaf growth, flowering, fruiting, or dormancy according to the species and season."
  };
}

function buildSafety(base, isPetSafe) {
  const toxicParts = isPetSafe ? [] : ["Leaves", "Stems", "Roots"];
  return {
    petSafe: isPetSafe,
    dogSafe: isPetSafe,
    catSafe: isPetSafe,
    humanToxicity: isPetSafe ? "Non-toxic and safe." : "Low to moderate toxicity if ingested. Oxalates or saponins cause drooling and irritation.",
    poisonousParts: toxicParts,
    safeHandlingInstructions: "Safe to handle normally. Wash hands after clipping stems."
  };
}

function generateCategoryFAQs(base, v) {
  const name = `${v.prefix} ${base.name}`;
  const isIndoor = base.categories.includes("indoor-plants");
  
  return [
    {
      question: `Is ${name} suitable for growing indoors?`,
      answer: `Yes, ${name} is ${isIndoor ? 'highly suitable for growing indoors' : 'typically grown outdoors but can be kept indoors under high-light conditions'}. As an indoor plant, it benefits from protection from direct wind and extreme temperature drops. Be sure to place it near a bright window to match its sunlight needs.`
    },
    {
      question: `Can I grow ${name} outdoors in my garden?`,
      answer: `Yes, you can grow ${name} outdoors ${base.indoorOutdoor === 'Indoor' ? 'during warm seasons, but you must bring it indoors if hardiness zones fall below its safety limit' : 'in suitable USDA zones: ' + base.zones.join(', ')}. Outdoor growth offers natural rain and better airflow, which promotes faster foliage development.`
    },
    {
      question: `What plant category or collection does ${name} fit into?`,
      answer: `${name} belongs to the category of ${base.categories.join(', ')}. Knowing this helps you group it with other plants of identical water, humidity, and fertilizer requirements, making home garden maintenance much easier.`
    }
  ];
}

function generateCareFAQs(base, v, care) {
  const name = `${v.prefix} ${base.name}`;
  
  return [
    {
      question: `What is the potting soil mix for ${name}?`,
      answer: `The potting soil for ${name} is a mix described as ${care.soilType}. It should maintain a soil pH level around ${care.soilPh} to support root respiration and nutrient uptake without moisture stagnation.`
    },
    {
      question: `How often should I water ${name}?`,
      answer: `The watering frequency for ${name} is: ${care.waterFrequency}. Since its water need is classified as ${care.waterRequirement}, wait until the top potting soil dries before watering again.`
    },
    {
      question: `What are the sunlight requirements for ${name}?`,
      answer: `${name} requires ${care.sunlightRequirement} to grow successfully. Indoors, position it close to a window facing east or south, or use grow lights to provide sufficient light spectrum without scorching the leaves.`
    },
    {
      question: `What temperature range does ${name} prefer?`,
      answer: `This species thrives in a temperature comfort range of ${care.temperature}. Keep it away from cold drafty windows or heating vents, and maintain relative humidity levels near ${care.humidity} to prevent dry leaf edges.`
    },
    {
      question: `How and when should I fertilize ${name}?`,
      answer: `Feed your ${name} with ${care.fertilizer.type} according to the schedule: ${care.fertilizer.schedule}. Always dilute the fertilizer to half-strength to avoid leaf tip burn.`
    },
    {
      question: `How do I propagate ${name}?`,
      answer: `You can successfully propagate ${name} via the ${care.propagationMethod} method. Use sterilized cutting tools, fresh damp potting mix, and optionally root hormone to stimulate root development.`
    },
    {
      question: `How and when should I prune ${name}?`,
      answer: `Pruning should be done according to this guideline: ${care.pruning}. Prune during the active growth phase to shape the plant and stimulate new foliage.`
    },
    {
      question: `How do I repot ${name}?`,
      answer: `Repotting advice for this species is: ${care.repotting}. Choose a pot that is ${care.potSize} with proper bottom drainage holes, and replenish the surrounding soil mix completely.`
    },
    {
      question: `What pot size and type is best for ${name}?`,
      answer: `Choose a pot size described as ${care.potSize}. Terracotta or porous clay pots are recommended for species requiring dry soil cycles, while plastic or glazed pots work well for moisture-loving plants.`
    },
    {
      question: `How do I know what size pot to grow my plant in?`,
      answer: `To know what size pot to grow your plant in, choose a container that is approximately 2 to 3 inches larger in diameter than the current root system. For ${name}, a pot size of ${care.potSize} is recommended to provide sufficient room for soil volume and growth without waterlogging.`
    },
    {
      question: `What are the companion plants for ${name}?`,
      answer: `Ideal companions that share identical soil, light, and water parameters include: ${care.companionPlants.join(', ')}.`
    }
  ];
}

function generateDiseaseFAQs(base, v, care) {
  const name = `${v.prefix} ${base.name}`;
  
  return [
    {
      question: `Why are the leaves on my ${name} turning yellow?`,
      answer: `Yellow leaves on ${name} are typically a sign of moisture stress (usually overwatering) or nutrient deficiencies. Ensure the pot has drainage holes, and let the soil dry to the required levels before watering again.`
    },
    {
      question: `Why are the leaves on my ${name} turning brown?`,
      answer: `Brown leaves or dry, crispy leaf margins on ${name} indicate low environmental humidity, underwatering, or too much direct solar radiation. Mist your plant regularly or place it near a humidifier to resolve this.`
    },
    {
      question: `What are the common pests affecting ${name}?`,
      answer: `Common pests that target this species include spider mites, aphids, mealybugs, thrips, and scale. Treat infestations immediately by isolating the plant and applying neem oil or insecticidal soap.`
    },
    {
      question: `What are the symptoms and treatments for water stress or root issues in ${name}?`,
      answer: `Root rot symptoms include wilting foliage, mushy dark stems, and a foul smell from the soil. Stop watering, prune away rotting roots, repot in fresh sterile soil, and adjust your watering to match its profile.`
    },
    {
      question: `How do I prevent fungal diseases on ${name}?`,
      answer: `Prevent fungus, powdery mildew, or leaf spots by ensuring excellent air circulation around the stems, watering only the soil instead of wetting the leaves, and using a well-draining soil mix.`
    }
  ];
}

function generateGrowingFAQs(base, v, timeline) {
  const name = `${v.prefix} ${base.name}`;
  
  return [
    {
      question: `How long does it take for ${name} to mature?`,
      answer: `It takes approximately ${timeline.timeToMature || 'a few growth seasons'} for ${name} to reach its mature size under standard cultivation. Regular feeding and optimal light will help it reach maturity faster.`
    },
    {
      question: `What is the growth rate of ${name}?`,
      answer: `The growth rate of ${name} is classified as ${timeline.growthRate || 'moderate'}. It actively develops during its active growth stage before slowing down during winter dormancy.`
    },
    {
      question: `What is the average mature size of ${name}?`,
      answer: `At maturity, ${name} reaches an average height of ${timeline.averageHeight || 'several feet'} and an average spread width of ${timeline.averageWidth || 'several feet'}, depending on container size or outdoor spacing.`
    },
    {
      question: `What is the flowering time for ${name}?`,
      answer: `The flowering time for ${name} is typically ${timeline.floweringTime || 'during late spring or summer months'}. Adequate phosphorus and high light intensity are key triggers for bloom production.`
    },
    {
      question: `Does ${name} produce edible fruit?`,
      answer: `${name} is ${timeline.fruitingTime ? 'known to produce edible harvests with a fruiting period around ' + timeline.fruitingTime : 'primarily grown for its ornamental foliage or medicinal value and does not produce typical edible fruit'}.`
    },
    {
      question: `When is the harvest time for ${name}?`,
      answer: `The harvest time is ${timeline.harvestTime || 'not applicable for this ornamental'}. If harvesting edible or medicinal parts, make sure to collect material during early morning hours when oils are concentrated.`
    }
  ];
}

function generatePlantFAQs(base, v, care, timeline, safety) {
  const name = `${v.prefix} ${base.name}`;
  const isPetSafe = base.categories.includes("pet-friendly-plants");
  
  const baseFAQs = [
    {
      question: `What is the botanical profile of ${name}?`,
      answer: `${name} (${base.scientific}) belongs to the family ${base.family} and is native to ${base.origin}. Growing it successfully requires mimicking these native parameters inside your home garden.`
    },
    {
      question: `Is ${name} toxic to dogs or cats?`,
      answer: `Regarding pet toxicity, ${name} is ${isPetSafe ? 'pet-safe, non-toxic, and friendly for both dogs and cats' : 'toxic to dogs and cats if ingested'}. Keep it out of reach of curious pets if you grow the toxic variety.`
    },
    {
      question: `What are the medicinal or traditional uses of ${name}?`,
      answer: `Traditional uses for ${name} include: ${base.categories.includes("medicinal-plants") ? 'therapeutic skin treatments or organic remedies under qualified guidance' : 'ornamental landscape display, interior air enrichment, and biophilic design benefits'}.`
    },
    {
      question: `What is the USDA hardiness zone rating for ${name}?`,
      answer: `${name} is hardy across USDA hardiness zones: ${base.zones.join(', ')}. In colder climates, it must be overwintered indoors before freezing temperatures arrive.`
    },
    {
      question: `Is ${name} a beginner friendly choice?`,
      answer: `With a difficulty rating of ${base.difficulty}, this plant is ${base.difficulty === 'Easy' ? 'excellent for beginners and handles minor watering mistakes' : 'better suited for experienced gardeners who can manage precise light and drainage requirements'}.`
    },
    {
      question: `Does ${name} help purify indoor air?`,
      answer: `${name} provides aesthetic green benefits and produces fresh oxygen during daylight hours. However, do not treat house plants as a complete replacement for proper home air ventilation.`
    },
    {
      question: `Is ${name} a verified botanical variety or catalog label?`,
      answer: `The prefix "${v.prefix}" is used here as a catalog label to distinguish varieties. The care guide applies directly to the parent species ${base.name} (${base.scientific}).`
    },
    {
      question: `What is the average lifespan of ${name}?`,
      answer: `The average lifespan of ${name} is ${base.lifespan}. With proper root maintenance, regular soil replacement, and pruning, it can live and thrive for many years.`
    },
    {
      question: `How do I prevent overwatering ${name}?`,
      answer: `Prevent overwatering by letting the soil dry out to the levels required by its ${care.waterRequirement} water profile. Ensure your container has drainage holes and dump any standing saucer water.`
    },
    {
      question: `Is it safe to place ${name} in a bedroom?`,
      answer: `Yes, keeping ${name} in your bedroom is safe and adds calming green aesthetics. Ensure it receives enough indirect light matching its requirement of ${care.sunlightRequirement}.`
    }
  ];

  return [
    ...baseFAQs,
    ...generateCategoryFAQs(base, v),
    ...generateCareFAQs(base, v, care),
    ...generateDiseaseFAQs(base, v, care),
    ...generateGrowingFAQs(base, v, timeline)
  ];
}

function buildPlantData(base, variant, wiki) {
  const plantId = slugify(`${variant.prefix} ${base.name}`);
  const catalogName = `${variant.prefix} ${base.name}`;
  const isPetSafe = base.categories.includes("pet-friendly-plants");
  const categories = [...new Set([...base.categories, base.water === "Low" ? "desert-plants" : null].filter(Boolean))];
  const variantNote = `${variant.prefix} is used here as a catalog label only. The care guide below describes the real species ${base.name} (${base.scientific}) and does not claim a verified botanical variety unless one is separately documented.`;
  const overview = `${wiki.overview} ${variantNote}`;
  const baseSlug = slugify(base.name);

  const localImageRelative = `/images/plants/${baseSlug}.jpg`;
  const localImagePath = path.join(IMAGES_DIR, `${baseSlug}.jpg`);
  const imagePath = fs.existsSync(localImagePath) ? localImageRelative : wiki.image;

  const care = buildCare(base);
  const timeline = buildTimeline(base);
  const safety = buildSafety(base, isPetSafe);

  return {
    id: plantId,
    slug: plantId,
    commonName: catalogName,
    scientificName: base.scientific,
    overview,
    nicknames: [base.name],
    family: base.family,
    origin: base.origin,
    nativeRegion: base.origin,
    usdaZones: base.zones,
    indoorOutdoor: base.indoorOutdoor,
    difficulty: base.difficulty,
    lifespan: base.lifespan,
    care,
    timeline,
    problems: [
      {
        name: "Water stress or root problems",
        symptoms: "Yellowing, wilting, leaf drop, mushy roots, or stalled growth.",
        treatment: "Check drainage and root health, remove damaged material, and adjust watering to the actual soil moisture.",
        prevention: "Use suitable soil, drainage holes for containers, and water according to plant need rather than habit."
      },
      {
        name: "Common pests",
        symptoms: "Sticky residue, distorted growth, webbing, spots, or visible insects on stems and leaf undersides.",
        treatment: "Isolate affected plants, rinse foliage, prune severe damage, and use an appropriate labeled treatment.",
        prevention: "Inspect plants regularly, avoid overcrowding, and maintain airflow."
      }
    ],
    safety,
    environmentalBenefits: {
      airPurifying: false,
      pollinatorFriendly: base.categories.includes("flowers") || base.categories.includes("outdoor-plants"),
      beeFriendly: base.categories.includes("flowers"),
      butterflyFriendly: base.categories.includes("flowers"),
      birdFriendly: base.categories.includes("trees") || base.categories.includes("fruit-plants"),
      carbonAbsorption: base.categories.includes("trees") ? "Trees can store meaningful carbon as they mature outdoors." : "Small plants store modest carbon in leaves, stems, and roots.",
      oxygenProduction: "Produces oxygen through normal photosynthesis; houseplants should not be treated as a replacement for ventilation."
    },
    additionalInfo: {
      commonMistakes: [
        "Following a fixed watering schedule without checking soil moisture.",
        "Ignoring light requirements.",
        "Using containers without drainage or unsuitable heavy soil."
      ],
      interestingFacts: [
        `${base.name} belongs to the ${base.family} family.`,
        variantNote
      ],
      benefits: [
        base.categories.includes("vegetables") || base.categories.includes("fruit-plants") || base.categories.includes("herbs") ? "Can provide edible harvests when correctly grown and identified." : "Adds ornamental greenery and habitat value where appropriate.",
        "Helps gardeners learn species-specific care habits."
      ],
      uses: {
        cooking: base.categories.includes("herbs") || base.categories.includes("vegetables") || base.categories.includes("fruit-plants") ? ["Use only correctly identified edible parts."] : undefined,
        medicinal: base.categories.includes("medicinal-plants") ? ["Traditional uses exist, but medicinal use should be checked with qualified guidance."] : undefined,
        traditional: ["Ornamental or practical garden use depending on species."]
      }
    },
    faqs: generatePlantFAQs(base, variant, care, timeline, safety),
    image: imagePath,
    imageSource: fs.existsSync(localImagePath) ? undefined : wiki.imageSource,
    airPurifyingRating: 0,
    images: {
      cover: imagePath,
      leaf: imagePath
    },
    categories
  };
}

function buildLegalityData(base, plantId) {
  const caution = base.name === "Pothos" || base.name === "English Ivy" || base.name === "Morning Glory";
  return {
    plantId,
    countries: [
      {
        country: "Australia",
        status: caution ? "Restricted" : "Allowed",
        reason: caution ? "This species can be invasive in some warm regions. Check state and local weed guidance before outdoor planting." : "No special restriction is included in this local guide; verify import and outdoor planting rules locally."
      },
      {
        country: "United States",
        status: caution ? "Restricted" : "Allowed",
        reason: caution ? "Some states or counties may list this species as invasive or problematic. Check local extension guidance." : "Commonly cultivated; check state invasive-plant and import rules before outdoor planting."
      }
    ]
  };
}

const IMAGES_DIR = path.join(__dirname, '../public/images/plants');
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "GrowMyPlant local content generator (educational website)"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (error) {
    console.warn(`Failed to download image from ${url} to ${destPath}: ${error.message}`);
    return false;
  }
}

async function main() {
  let totalGenerated = 0;
  const wikiByName = new Map();

  for (const base of BASE_SPECIES) {
    console.log(`Fetching wiki summary for ${base.name}...`);
    const wiki = await fetchWikiSummary(base);
    wikiByName.set(base.name, wiki);

    // Download local image if it doesn't exist
    const baseSlug = slugify(base.name);
    const destPath = path.join(IMAGES_DIR, `${baseSlug}.jpg`);
    if (!fs.existsSync(destPath)) {
      console.log(`Downloading local image for ${base.name} from ${wiki.image}...`);
      await downloadImage(wiki.image, destPath);
      // Wait to avoid rate limits on image host
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    // Wait to avoid rate limits on Wikipedia API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  for (const base of BASE_SPECIES) {
    const wiki = wikiByName.get(base.name);
    for (const variant of VARIETIES) {
      const plantData = buildPlantData(base, variant, wiki);
      const legalityData = buildLegalityData(base, plantData.id);
      fs.writeFileSync(path.join(PLANTS_DIR, `${plantData.id}.json`), JSON.stringify(plantData, null, 2));
      fs.writeFileSync(path.join(LEGALITY_DIR, `${plantData.id}.json`), JSON.stringify(legalityData, null, 2));
      totalGenerated++;
    }
  }

  console.log(`Successfully generated ${totalGenerated} species-level plant files & regional caution records!`);
}

// Helper to generate slug
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
