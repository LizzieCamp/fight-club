import { Character, CharacterCategory } from './types';

type CreateCharacter = (name: string, category: CharacterCategory) => Character;

const createCharacter: CreateCharacter = (name, category) => {
    switch (category) {
        case 'lightweight':
            return {
                name,
                category,
                agility: 1.25,
                hp: 75,
                damage: 10,
            };
        case 'middleweight':
            return {
                name,
                category,
                agility: 1,
                hp: 100,
                damage: 15,
            };

        case 'heavyweight':
            return {
                name,
                category,
                agility: 0.75,
                hp: 125,
                damage: 20,
            };
    }
};

export default createCharacter;
