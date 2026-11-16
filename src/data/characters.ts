
import type {
  CharacterDefinition,
  CharacterProgress,
} from "@/types/character";

export const characters = [
  {
    id: "knight",
    name: "Knight",
    title: "The Guardian",
    role: "Tank",
    description: "A brave warrior who protects allies.",
    baseStats: {
      strength: 90,
      intelligence: 35,
      agility: 45,
      vitality: 100,
    },
    basicAttack: {
  name: "Sword Slash",
  baseDamage: 10,
  scalingStat: "strength",
  multiplier: 0.8,
},
    skills: [
      {
        id: "shield-bash",
        name: "Shield Bash",
        description: "Stuns an enemy with a powerful shield strike.",
        cooldown: 5,
        manaCost: 20,
      },
      {
        id: "iron-fortress",
        name: "Iron Fortress",
        description: "Greatly reduces incoming damage.",
        cooldown: 30,
        manaCost: 50,
      },
    ],
    spritePath: "/sprites/knight.png",
    unlock: {
      availableAtStart: true,
    },
  },
  {
    id: "mage",
    name: "Mage",
    title: "The Arcane",
    role: "Magic",
    description: "A master of powerful elemental magic.",
    baseStats: {
      strength: 30,
      intelligence: 100,
      agility: 55,
      vitality: 45,
    },
    basicAttack: {
  name: "Arcane Bolt",
  baseDamage: 8,
  scalingStat: "intelligence",
  multiplier: 0.9,
},
    skills: [
      {
        id: "arcane-blast",
        name: "Arcane Blast",
        description: "Launches a powerful magical projectile.",
        cooldown: 5,
        manaCost: 25,
      },
      {
        id: "meteor-storm",
        name: "Meteor Storm",
        description: "Calls down a storm of magical meteors.",
        cooldown: 40,
        manaCost: 70,
      },
    ],
    spritePath: "/sprites/mage.png",
    unlock: {
      availableAtStart: true,
    },
  },
  {
    id: "ranger",
    name: "Ranger",
    title: "The Pathfinder",
    role: "Ranged",
    description: "An expert archer with incredible precision.",
    baseStats: {
      strength: 65,
      intelligence: 55,
      agility: 100,
      vitality: 60,
    },
    basicAttack: {
  name: "Quick Shot",
  baseDamage: 9,
  scalingStat: "agility",
  multiplier: 0.85,
},
    skills: [
      {
        id: "piercing-arrow",
        name: "Piercing Arrow",
        description: "Fires an arrow that pierces enemy defenses.",
        cooldown: 6,
        manaCost: 20,
      },
      {
        id: "rain-of-arrows",
        name: "Rain of Arrows",
        description: "Shoots multiple arrows across the battlefield.",
        cooldown: 35,
        manaCost: 60,
      },
    ],
    spritePath: "/sprites/ranger.png",
    unlock: {
  availableAtStart: false,
  priceInGems: 1200,
},
  },
  {
    id: "assassin",
    name: "Assassin",
    title: "The Shadow",
    role: "Critical",
    description: "A silent fighter who strikes from the shadows.",
    baseStats: {
      strength: 75,
      intelligence: 50,
      agility: 100,
      vitality: 45,
    },
    basicAttack: {
  name: "Shadow Slash",
  baseDamage: 10,
  scalingStat: "agility",
  multiplier: 0.9,
},
    skills: [
      {
        id: "shadow-strike",
        name: "Shadow Strike",
        description: "Deals a powerful critical attack.",
        cooldown: 8,
        manaCost: 25,
      },
      {
        id: "phantom-dance",
        name: "Phantom Dance",
        description: "Performs a series of rapid shadow attacks.",
        cooldown: 40,
        manaCost: 65,
      },
    ],
    spritePath: "/sprites/assassin.png",
    unlock: {
  availableAtStart: false,
  priceInGems: 200,
    },
  },
  {
    id: "cleric",
    name: "Cleric",
    title: "The Luminary",
    role: "Support",
    description: "A holy healer who restores vitality.",
    baseStats: {
      strength: 35,
      intelligence: 90,
      agility: 45,
      vitality: 85,
    },
    basicAttack: {
  name: "Holy Strike",
  baseDamage: 8,
  scalingStat: "intelligence",
  multiplier: 0.8,
},
    skills: [
      {
        id: "healing-light",
        name: "Healing Light",
        description: "Restores a portion of health.",
        cooldown: 8,
        manaCost: 25,
      },
      {
        id: "divine-sanctuary",
        name: "Divine Sanctuary",
        description: "Creates a protective healing sanctuary.",
        cooldown: 45,
        manaCost: 70,
      },
    ],
    spritePath: "/sprites/cleric.png",
    unlock: {
  availableAtStart: false,
  priceInGems: 550,
},

},
] satisfies CharacterDefinition[];

export const initialCharacterProgress: CharacterProgress[] = [
  {
    characterId: "knight",
    level: 1,
    xp: 0,
    isUnlocked: true,
    attributePoints: 0,
    allocatedStats: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    },
  },
  {
    characterId: "mage",
    level: 1,
    xp: 0,
    isUnlocked: true,
    attributePoints: 0,
    allocatedStats: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    },
  },
  {
    characterId: "ranger",
    level: 1,
    xp: 0,
    isUnlocked: false,
    attributePoints: 0,
    allocatedStats: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    },
  },
  {
    characterId: "assassin",
    level: 1,
    xp: 0,
    isUnlocked: false,
    attributePoints: 0,
    allocatedStats: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    },
  },
  {
    characterId: "cleric",
    level: 1,
    xp: 0,
    isUnlocked: false,
    attributePoints: 0,
    allocatedStats: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 0,
    },
  },
];