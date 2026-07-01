const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '../public/images/plants');

// Ensure image directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 91 base species with their corresponding Wikipedia-friendly scientific names
const SPECIES_LIST = [
  { name: "Pothos", scientific: "Epipremnum aureum" },
  { name: "Snake Plant", scientific: "Sansevieria trifasciata" },
  { name: "Aloe Vera", scientific: "Aloe vera" },
  { name: "Spider Plant", scientific: "Chlorophytum comosum" },
  { name: "Peace Lily", scientific: "Spathiphyllum" },
  { name: "ZZ Plant", scientific: "Zamioculcas zamiifolia" },
  { name: "Monstera", scientific: "Monstera deliciosa" },
  { name: "Boston Fern", scientific: "Nephrolepis exaltata" },
  { name: "Jade Plant", scientific: "Crassula ovata" },
  { name: "English Ivy", scientific: "Hedera helix" },
  { name: "Fiddle Leaf Fig", scientific: "Ficus lyrata" },
  { name: "Rubber Plant", scientific: "Ficus elastica" },
  { name: "Chinese Evergreen", scientific: "Aglaonema" },
  { name: "Cast Iron Plant", scientific: "Aspidistra elatior" },
  { name: "Croton", scientific: "Codiaeum variegatum" },
  { name: "Zebra Plant", scientific: "Aphelandra squarrosa" },
  { name: "Nerve Plant", scientific: "Fittonia albivenis" },
  { name: "Prayer Plant", scientific: "Maranta leuconeura" },
  { name: "Chinese Money Plant", scientific: "Pilea peperomioides" },
  { name: "Calathea", scientific: "Goeppertia picturata" },
  { name: "Basil", scientific: "Ocimum basilicum" },
  { name: "Mint", scientific: "Mentha" },
  { name: "Rosemary", scientific: "Salvia rosmarinus" },
  { name: "Lavender", scientific: "Lavandula" },
  { name: "Thyme", scientific: "Thymus vulgaris" },
  { name: "Oregano", scientific: "Origanum vulgare" },
  { name: "Sage", scientific: "Salvia officinalis" },
  { name: "Parsley", scientific: "Petroselinum crispum" },
  { name: "Coriander", scientific: "Coriandrum sativum" },
  { name: "Dill", scientific: "Anethum graveolens" },
  { name: "Fennel", scientific: "Foeniculum vulgare" },
  { name: "Chives", scientific: "Allium schoenoprasum" },
  { name: "Lemongrass", scientific: "Cymbopogon citratus" },
  { name: "Bay Leaf", scientific: "Laurus nobilis" },
  { name: "Rose", scientific: "Rosa" },
  { name: "Marigold", scientific: "Tagetes" },
  { name: "Jasmine", scientific: "Jasminum" },
  { name: "Sunflower", scientific: "Helianthus annuus" },
  { name: "Hibiscus", scientific: "Hibiscus rosa-sinensis" },
  { name: "Bougainvillea", scientific: "Bougainvillea spectabilis" },
  { name: "Petunia", scientific: "Petunia" },
  { name: "Dahlia", scientific: "Dahlia" },
  { name: "Tulip", scientific: "Tulipa" },
  { name: "Daisy", scientific: "Bellis perennis" },
  { name: "Orchid", scientific: "Orchidaceae" },
  { name: "Chrysanthemum", scientific: "Chrysanthemum" },
  { name: "Hydrangea", scientific: "Hydrangea" },
  { name: "Morning Glory", scientific: "Ipomoea" },
  { name: "Cactus", scientific: "Cactaceae" },
  { name: "Neem", scientific: "Azadirachta indica" },
  { name: "Ashwagandha", scientific: "Withania somnifera" },
  { name: "Giloy", scientific: "Tinospora cordifolia" },
  { name: "Tulsi", scientific: "Ocimum tenuiflorum" },
  { name: "Turmeric", scientific: "Curcuma longa" },
  { name: "Ginger", scientific: "Zingiber officinale" },
  { name: "Moringa", scientific: "Moringa oleifera" },
  { name: "Amla", scientific: "Phyllanthus emblica" },
  { name: "Brahmi", scientific: "Bacopa monnieri" },
  { name: "Tomato", scientific: "Solanum lycopersicum" },
  { name: "Potato", scientific: "Solanum tuberosum" },
  { name: "Onion", scientific: "Allium cepa" },
  { name: "Garlic", scientific: "Allium sativum" },
  { name: "Carrot", scientific: "Daucus carota" },
  { name: "Cabbage", scientific: "Brassica oleracea" },
  { name: "Spinach", scientific: "Spinacia oleracea" },
  { name: "Broccoli", scientific: "Broccoli" },
  { name: "Cucumber", scientific: "Cucumis sativus" },
  { name: "Eggplant", scientific: "Solanum melongena" },
  { name: "Chili Pepper", scientific: "Capsicum annuum" },
  { name: "Mango", scientific: "Mangifera indica" },
  { name: "Apple", scientific: "Malus domestica" },
  { name: "Orange", scientific: "Citrus sinensis" },
  { name: "Lemon", scientific: "Citrus limon" },
  { name: "Banana", scientific: "Musa" },
  { name: "Strawberry", scientific: "Fragaria" },
  { name: "Blueberry", scientific: "Vaccinium" },
  { name: "Avocado", scientific: "Persea americana" },
  { name: "Grapes", scientific: "Vitis vinifera" },
  { name: "Coconut", scientific: "Cocos nucifera" },
  { name: "Fig", scientific: "Ficus carica" },
  { name: "Pineapple", scientific: "Ananas comosus" },
  { name: "Oak", scientific: "Quercus" },
  { name: "Maple", scientific: "Acer" },
  { name: "Pine", scientific: "Pinus" },
  { name: "Cedar", scientific: "Cedrus" },
  { name: "Banyan", scientific: "Ficus benghalensis" },
  { name: "Peepal", scientific: "Ficus religiosa" },
  { name: "Cherry Blossom", scientific: "Cherry blossom" },
  { name: "Teak", scientific: "Tectona grandis" },
  { name: "Mahogany", scientific: "Swietenia mahagoni" },
  { name: "Sandalwood", scientific: "Santalum album" }
];

// 12 primary generated illustrations to skip
const LOCAL_MAIN_PLANTS = [
  "pothos", "snake-plant", "aloe-vera", "spider-plant", "peace-lily", "basil", "lavender", "neem", "mango", "potato", "tomato", "rose"
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Fetch JSON data via https
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'GrowMyPlantBot/1.0 (https://growmyplant.online; admin@growmyplant.online)'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status: ${res.statusCode}`));
        return;
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Download image helper (handles redirects)
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'GrowMyPlantBot/1.0 (https://growmyplant.online; admin@growmyplant.online)'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsedUrl = new URL(url);
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`;
        }
        downloadImage(redirectUrl, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Status Code ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(destPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function start() {
  console.log(`Starting Wikipedia Botanical image downloader for ${SPECIES_LIST.length} species...`);
  
  for (let i = 0; i < SPECIES_LIST.length; i++) {
    const item = SPECIES_LIST[i];
    const slug = slugify(item.name);
    const destFile = path.join(IMAGES_DIR, `${slug}.jpg`);

    // Skip local main plants
    if (LOCAL_MAIN_PLANTS.includes(slug)) {
      console.log(`[Skip] ${item.name} (Using generated PNG)`);
      continue;
    }

    // Skip if file already exists
    if (fs.existsSync(destFile)) {
      console.log(`[Exists] ${item.name} -> ${slug}.jpg`);
      continue;
    }

    // Replace space with underscore for Wikipedia page names
    const wikiPage = encodeURIComponent(item.scientific.replace(/ /g, '_'));
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiPage}`;

    try {
      console.log(`[Querying Wikipedia] ${item.name} (${item.scientific})...`);
      const summary = await getJSON(summaryUrl);
      
      let imageUrl = '';
      if (summary.originalimage && summary.originalimage.source) {
        imageUrl = summary.originalimage.source;
      } else if (summary.thumbnail && summary.thumbnail.source) {
        imageUrl = summary.thumbnail.source;
      }

      if (imageUrl) {
        console.log(`  -> Image URL found: ${imageUrl}`);
        console.log(`  -> Downloading to ${slug}.jpg...`);
        await downloadImage(imageUrl, destFile);
        console.log(`[Success] ${item.name} saved successfully.`);
      } else {
        console.log(`  -> No image in summary. Falling back to search.`);
        throw new Error("No image found");
      }

      // Safe sleep
      await new Promise(r => setTimeout(r, 150));
    } catch (error) {
      console.error(`[Error] Failed for ${item.name}:`, error.message);
      // Fallback: search on Lorem Flickr without "botany" keyword to avoid default cat picture
      try {
        console.log(`  -> Trying Lorem Flickr fallback for ${item.name}...`);
        const fallbackUrl = `https://loremflickr.com/600/600/${encodeURIComponent(item.name.toLowerCase() + ',plant')}`;
        await downloadImage(fallbackUrl, destFile);
        console.log(`[Success] ${item.name} saved using fallback.`);
      } catch (fallbackError) {
        console.error(`  -> Fallback also failed:`, fallbackError.message);
      }
    }
  }

  console.log("Downloader task completed!");
}

start();
