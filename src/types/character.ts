export type CharacterId =
  | "knight"
  | "mage"
  | "ranger"
  | "assassin"
  | "cleric";

export type CharacterStats = {
  strength: number;
  intelligence: number;
  agility: number;
  vitality: number;
};

export type CharacterSkill = {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  manaCost: number;
};

export type BasicAttack = {
  name: string;
  baseDamage: number;
  scalingStat: keyof CharacterStats;
  multiplier: number;
};

export type CharacterDefinition = {
    id: CharacterId;
    name: string;
    title: string;
    role: string;
    description: string;
    baseStats: CharacterStats;
    basicAttack: BasicAttack;
    skills: CharacterSkill[];
    spritePath: string;
    unlock: {
    availableAtStart: boolean;
    priceInGems?: number;
    };
};

export type CharacterProgress = {
    characterId: CharacterId;
    level: number;
    xp: number;
    isUnlocked: boolean;
    attributePoints: number;
    allocatedStats: CharacterStats;
};

export type CharacterCombatState = {
    characterId: CharacterId;
    mana: number;
    maxMana: number;
    skillCooldowns: Record<string, number>;
};