import { GameState } from "../tick/types";

export type CharacterCategory = 'lightweight' | 'middleweight' | 'heavyweight';

type BaseCharacter = {
    characterName: string;
};

type Lightweight = BaseCharacter & {
    attackCooldown: 8;
    maxHP: 75;
    damage: 10;
    dodgeCooldown: 5;
    agility: 12;
};

type Middleweight = BaseCharacter & {
    attackCooldown: 10;
    maxHP: 100;
    damage: 15;
    dodgeCooldown: 7;
    agility: 8;
};

type Heavyweight = BaseCharacter & {
    attackCooldown: 13;
    maxHP: 125;
    damage: 20;
    dodgeCooldown: 10;
    agility: 4;
};

export type CharacterAttributes = Lightweight | Middleweight | Heavyweight;

export type StateUpdater = (state: Readonly<GameState>) => GameState;
