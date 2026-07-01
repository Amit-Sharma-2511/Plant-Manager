import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const plants = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/plants' }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    commonName: z.string(),
    scientificName: z.string(),
    overview: z.string(),
    nicknames: z.array(z.string()).default([]),
    family: z.string(),
    origin: z.string(),
    nativeRegion: z.string(),
    usdaZones: z.array(z.string()),
    indoorOutdoor: z.enum(['Indoor', 'Outdoor', 'Both']),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    lifespan: z.string(),
    
    // Care guide
    care: z.object({
      waterRequirement: z.string(),
      waterFrequency: z.string(),
      sunlightRequirement: z.string(),
      temperature: z.string(),
      humidity: z.string(),
      soilType: z.string(),
      soilPh: z.string(),
      fertilizer: z.object({
        type: z.string(),
        schedule: z.string(),
      }),
      potSize: z.string(),
      repotting: z.string(),
      pruning: z.string(),
      propagationMethod: z.string(),
      companionPlants: z.array(z.string()),
    }),

    // Growth Timeline
    timeline: z.object({
      germination: z.string().optional(),
      growthRate: z.string(),
      timeToMature: z.string(),
      floweringTime: z.string().optional(),
      fruitingTime: z.string().optional(),
      harvestTime: z.string().optional(),
      averageHeight: z.string(),
      averageWidth: z.string(),
      growthStage: z.string(),
    }),

    // Health
    problems: z.array(z.object({
      name: z.string(),
      symptoms: z.string(),
      treatment: z.string(),
      prevention: z.string(),
    })),

    // Safety
    safety: z.object({
      petSafe: z.boolean(),
      dogSafe: z.boolean(),
      catSafe: z.boolean(),
      humanToxicity: z.string(),
      poisonousParts: z.array(z.string()),
      safeHandlingInstructions: z.string(),
    }),

    // Environmental Benefits
    environmentalBenefits: z.object({
      airPurifying: z.boolean(),
      pollinatorFriendly: z.boolean(),
      beeFriendly: z.boolean(),
      butterflyFriendly: z.boolean(),
      birdFriendly: z.boolean(),
      carbonAbsorption: z.string(),
      oxygenProduction: z.string(),
    }),

    // Additional Info
    additionalInfo: z.object({
      commonMistakes: z.array(z.string()),
      interestingFacts: z.array(z.string()),
      benefits: z.array(z.string()),
      uses: z.object({
        medicinal: z.array(z.string()).optional(),
        cooking: z.array(z.string()).optional(),
        traditional: z.array(z.string()).optional(),
      }),
    }),

    // FAQ
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),

    image: z.string(),
    imageSource: z.string().optional(),
    airPurifyingRating: z.number().min(0).max(5).default(0),

    // Images
    images: z.object({
      cover: z.string(),
      leaf: z.string(),
      flower: z.string().optional(),
      fruit: z.string().optional(),
      diseases: z.string().optional(),
    }),

    categories: z.array(z.string()),
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.string(),
    coverImage: z.string(),
    tags: z.array(z.string()),
  })
});

const legality = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/legality' }),
  schema: z.object({
    plantId: z.string(),
    countries: z.array(z.object({
      country: z.string(),
      status: z.enum(['Allowed', 'Restricted', 'Invasive', 'Protected', 'Endangered', 'Requires Permit', 'Illegal to Import', 'Illegal to Sell', 'Illegal to Cultivate']),
      reason: z.string()
    }))
  })
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/faqs' }),
  schema: z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
});

export const collections = {
  plants,
  blog,
  legality,
  faqs,
};
