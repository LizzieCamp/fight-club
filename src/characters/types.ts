export type CharacterCategory = 'lightweight' | 'middleweight' | 'heavyweight';

type BaseCharacter = {
    characterName: string;
};

type Lightweight = BaseCharacter & {
    category: Extract<CharacterCategory, 'lightweight'>;
    agility: 1.25; // dodge/attack rate
    hp: 75;
    damage: 10;
};

type Middleweight = BaseCharacter & {
    category: Extract<CharacterCategory, 'middleweight'>;
    agility: 1; // dodge/attack rate
    hp: 100;
    damage: 15;
};

type Heavyweight = BaseCharacter & {
    category: Extract<CharacterCategory, 'heavyweight'>;
    agility: 0.75; // dodge/attack rate
    hp: 125;
    damage: 20;
};

export type Character = Lightweight | Middleweight | Heavyweight;
