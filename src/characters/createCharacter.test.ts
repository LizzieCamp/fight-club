import create from './createCharacter';
import { CharacterCategory } from './types';

test.each([
    {
        name: 'light',
        category: 'lightweight',
        expected: {
            characterName: 'Light',
            attackCooldown: 8,
            maxHP: 75,
            damage: 10,
        },
    },
    {
        name: 'middle',
        category: 'middleweight',
        expected: {
            characterName: 'Middle',
            attackCooldown: 10,
            maxHP: 100,
            damage: 15,
        },
    },
    {
        name: 'heavy',
        category: 'heavyweight',
        expected: {
            characterName: 'Heavy',
            attackCooldown: 13,
            maxHP: 125,
            damage: 20,
        },
    }
])('creates a $category character', ({ name, category, expected }) => {
    expect(create(name, category as CharacterCategory)).toEqual(expected);
});
