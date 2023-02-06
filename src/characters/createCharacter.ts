import { capitalise } from '../lib/capitalise';
import { CharacterAttributes, CharacterCategory } from './types';

// Add me to ./types
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
                dodgeCooldown: 5,
                agility: 12,
            };
        case 'middleweight':
            return {
                characterName: name,
                attackCooldown: 10,
                maxHP: 100,
                damage: 15,
                dodgeCooldown: 7,
                agility: 8,
            };

        case 'heavyweight':
            return {
                characterName: name,
                attackCooldown: 13,
                maxHP: 125,
                damage: 20,
                dodgeCooldown: 10,
                agility: 4,
            };
    }
};

export default createCharacter;
