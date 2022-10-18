export type CharacterCategory = 'lightweight' | 'middleweight' | 'heavyweight';

type Lightweight = {
    name: string; // name for character - api random name for them
    category: Extract<CharacterCategory, 'lightweight'>;
    agility: 1.25; // dodge/attack rate
    hp: 75;
    damage: 10;
};

type Middleweight = {
    name: string; // name for character - api random name for them
    category: Extract<CharacterCategory, 'middleweight'>;
    agility: 1; // dodge/attack rate
    hp: 100;
    damage: 15;
};

type Heavyweight = {
    name: string; // name for character - api random name for them
    category: Extract<CharacterCategory, 'heavyweight'>;
    agility: 0.75; // dodge/attack rate
    hp: 125;
    damage: 20;
};

export type Character = Lightweight | Middleweight | Heavyweight;
