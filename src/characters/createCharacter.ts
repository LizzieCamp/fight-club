import { capitalise } from '../lib/capitalise';
import { CharacterAttributes, CharacterCategory } from './types';

type CreateCharacter = (name: string, category: CharacterCategory) => CharacterAttributes;

const createCharacter: CreateCharacter = (name, category) => {
    name = capitalise(name);
    switch (category) {
        case 'lightweight':
            return {
                characterName: name,
                attackCooldown: 8,
                maxHP: 75,
                damage: 10,
            };
        case 'middleweight':
            return {
                characterName: name,
                attackCooldown: 10,
                maxHP: 100,
                damage: 15,
            };

        case 'heavyweight':
            return {
                characterName: name,
                attackCooldown: 13,
                maxHP: 125,
                damage: 20,
            };
    }
};

export default createCharacter;
