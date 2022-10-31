import { capitalise } from '../lib/capitalise';
import { Character, CharacterCategory } from './types';

type CreateCharacter = (name: string, category: CharacterCategory) => Character;

const createCharacter: CreateCharacter = (name, category) => {
    name = capitalise(name);
    switch (category) {
        case 'lightweight':
            return {
                characterName: name,
                category,
                agility: 1.25,
                hp: 75,
                damage: 10,
            };
        case 'middleweight':
            return {
                characterName: name,
                category,
                agility: 1,
                hp: 100,
                damage: 15,
            };

        case 'heavyweight':
            return {
                characterName: name,
                category,
                agility: 0.75,
                hp: 125,
                damage: 20,
            };
    }
};

export default createCharacter;
