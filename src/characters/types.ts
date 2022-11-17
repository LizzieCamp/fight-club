export type CharacterCategory = 'lightweight' | 'middleweight' | 'heavyweight';

type BaseCharacter = {
    characterName: string;
};

type Lightweight = BaseCharacter & {
    attackCooldown: 8;
    maxHP: 75;
    damage: 10;
};

type Middleweight = BaseCharacter & {
    attackCooldown: 10;
    maxHP: 100;
    damage: 15;
};

type Heavyweight = BaseCharacter & {
    attackCooldown: 13;
    maxHP: 125;
    damage: 20;
};

export type CharacterAttributes = Lightweight | Middleweight | Heavyweight;


